#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LenderXStack } from '../lib/lenderx-stack';

const app = new cdk.App();
new LenderXStack(app, 'LenderXStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
