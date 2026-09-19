import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
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

    // CDK Outputs
    new cdk.CfnOutput(this, 'TableName', { value: this.singleTable.tableName });
    new cdk.CfnOutput(this, 'DocumentBucketName', { value: this.documentBucket.bucketName });
  }
}
