import { APIGatewayProxyResult } from 'aws-lambda';
import { DomainError } from './errors';
import { ZodError } from 'zod';

export const ApiHelper = {
  success: (statusCode: number, data?: any): APIGatewayProxyResult => ({
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // For hackathon UI
    },
    body: data ? JSON.stringify(data) : '',
  }),

  handleError: (error: unknown): APIGatewayProxyResult => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    if (error instanceof ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'VALIDATION_ERROR',
          message: 'Invalid request payload',
          details: error.issues,
        }),
      };
    }

    if (error instanceof DomainError) {
      return {
        statusCode: error.statusCode,
        headers,
        body: JSON.stringify({
          error: error.code,
          message: error.message,
        }),
      };
    }

    console.error('Unhandled Error:', error);

    // For prototype, we might want to see the error message.
    // In prod, hide internal messages.
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  },
};
