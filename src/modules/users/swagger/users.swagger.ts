export const UsersSwaggerExamples = {
  userList: {
    status: 200,
    description: 'List of users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              fullname: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john@example.com' },
              role: { type: 'string', example: 'SEEKER' },
              createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            },
          },
        },
        total: { type: 'number', example: 10 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
      },
    },
  },
  
  userCreated: {
    status: 200,
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
        fullname: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
        role: { type: 'string', example: 'SEEKER' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  },
  
  validationError: {
    status: 400,
    description: 'Bad request - validation error',
  },
}; 