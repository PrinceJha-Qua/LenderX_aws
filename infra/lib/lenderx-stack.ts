import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class LenderXStack extends cdk.Stack {
  public readonly singleTable: dynamodb.Table;
  public readonly documentBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Single Table Design (ADR-002)
    this.singleTable = new dynamodb.Table(this, 'LenderXTable', {
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Cost discipline
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For hackathon teardown
      timeToLiveAttribute: 'ttl', // For idempotency keys auto-cleanup
    });

    // GSI for finding all loans for a specific borrower
    this.singleTable.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'GSI1PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI1SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // 2. S3 Bucket for Business Document Uploads
    this.documentBucket = new s3.Bucket(this, 'LenderXDocuments', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true, // For hackathon teardown
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(7), // Don't pay for stale storage
        },
      ],
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
          allowedOrigins: ['*'], // Will restrict to CloudFront domain later
          allowedHeaders: ['*'],
        },
      ],
    });

    // 3. Lifecycle Lambda (Checks for Default)
    const checkDefaultLambda = new lambda.Function(this, 'CheckDefaultLambda', {
      runtime: lambda.Runtime.NODEJS_24_X,
      handler: 'index.handler', // We will bundle this later
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => { 
          console.log("Mock handler for CheckDefault", event); 
        };
      `),
      environment: {
        TABLE_NAME: this.singleTable.tableName,
      },
    });
    this.singleTable.grantReadWriteData(checkDefaultLambda);

    // 4. Loan Lifecycle Step Function (Wait -> Check)
    const waitState = new stepfunctions.Wait(this, 'WaitForTerm', {
      time: stepfunctions.WaitTime.secondsPath('$.termDaysSeconds'), // We'll pass seconds for the hackathon instead of days to test it fast
    });

    const checkState = new tasks.LambdaInvoke(this, 'CheckLoanStatus', {
      lambdaFunction: checkDefaultLambda,
      payloadResponseOnly: true,
    });

    const definition = waitState.next(checkState);

    const lifecycleStateMachine = new stepfunctions.StateMachine(this, 'LoanLifecycle', {
      definitionBody: stepfunctions.DefinitionBody.fromChainable(definition),
      timeout: cdk.Duration.days(365),
    });

    // 5. API Gateway Lambdas
    const lambdaProps: lambdaNodejs.NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_24_X,
      entry: '../backend/src/handlers/index.ts',
      environment: { TABLE_NAME: this.singleTable.tableName },
      bundling: { minify: true, sourceMap: true },
    };

    const createLoanLambda = new lambdaNodejs.NodejsFunction(this, 'CreateLoanLambda', {
      ...lambdaProps,
      handler: 'createLoan',
    });
    const underwriteLoanLambda = new lambdaNodejs.NodejsFunction(
  this,
  'UnderwriteLoanLambda',
  {
    ...lambdaProps,
    handler: 'underwriteLoan',
  },
  );
    const fundLoanLambda = new lambdaNodejs.NodejsFunction(this, 'FundLoanLambda', {
      ...lambdaProps,
      handler: 'fundLoan',
    });
    const repayLoanLambda = new lambdaNodejs.NodejsFunction(this, 'RepayLoanLambda', {
      ...lambdaProps,
      handler: 'repayLoan',
    });

    // Grant DB Permissions
    this.singleTable.grantReadWriteData(createLoanLambda);
    this.singleTable.grantReadWriteData(fundLoanLambda);
    this.singleTable.grantReadWriteData(repayLoanLambda);
    this.singleTable.grantReadWriteData(underwriteLoanLambda);

    // 6. API Gateway Configuration
    const api = new apigateway.RestApi(this, 'LenderXApi', {
      restApiName: 'LenderX Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // For hackathon
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'x-borrower-id'],
      },
    });

    const loansResource = api.root.addResource('loans');

    // POST /loans -> Create Loan
    loansResource.addMethod('POST', new apigateway.LambdaIntegration(createLoanLambda));
    // POST /loans/underwrite -> Mock Underwriting
const underwriteResource = loansResource.addResource('underwrite');
underwriteResource.addMethod(
  'POST',
  new apigateway.LambdaIntegration(underwriteLoanLambda),
);

    // POST /loans/fund -> Fund Loan
    const fundResource = loansResource.addResource('fund');
    fundResource.addMethod('POST', new apigateway.LambdaIntegration(fundLoanLambda));

    // POST /loans/repay -> Repay Loan
    const repayResource = loansResource.addResource('repay');
    repayResource.addMethod('POST', new apigateway.LambdaIntegration(repayLoanLambda));

    // CDK Outputs
    new cdk.CfnOutput(this, 'TableName', { value: this.singleTable.tableName });
    new cdk.CfnOutput(this, 'DocumentBucketName', { value: this.documentBucket.bucketName });
    new cdk.CfnOutput(this, 'StateMachineArn', { value: lifecycleStateMachine.stateMachineArn });
    new cdk.CfnOutput(this, 'ApiEndpoint', { value: api.url });
  }
}
