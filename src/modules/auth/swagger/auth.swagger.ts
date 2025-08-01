import { ApiResponse } from '@nestjs/swagger';

export const AuthSwaggerExamples = {
  loginSuccess: {
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Login successful',
        },
      },
    },
  },
  
  loginError: {
    status: 401,
    description: 'Invalid credentials',
  },
  
  logoutSuccess: {
    status: 200,
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Logged out successfully',
        },
      },
    },
  },
}; 