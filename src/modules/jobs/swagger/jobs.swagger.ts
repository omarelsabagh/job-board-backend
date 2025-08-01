import { JobStatus } from '@prisma/client';

export const JobsSwaggerExamples = {
  singleJob: {
    status: 200,
    description: 'Job retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
        title: { type: 'string', example: 'Software Engineer' },
        description: { type: 'string', example: 'We are looking for a skilled software engineer...' },
        location: { type: 'string', example: 'New York, NY' },
        salary: { type: 'number', example: 80000 },
        status: { type: 'string', example: 'OPEN' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  },
  
  jobList: {
    status: 200,
    description: 'Jobs retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              title: { type: 'string', example: 'Software Engineer' },
              description: { type: 'string', example: 'We are looking for a skilled software engineer...' },
              location: { type: 'string', example: 'New York, NY' },
              salary: { type: 'number', example: 80000 },
              status: { type: 'string', example: 'OPEN' },
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
  
  jobCreated: {
    status: 201,
    description: 'Job created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
        title: { type: 'string', example: 'Software Engineer' },
        description: { type: 'string', example: 'We are looking for a skilled software engineer...' },
        location: { type: 'string', example: 'New York, NY' },
        salary: { type: 'number', example: 80000 },
        status: { type: 'string', example: 'OPEN' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  },
  
  jobUpdated: {
    status: 200,
    description: 'Job updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
        title: { type: 'string', example: 'Senior Software Engineer' },
        description: { type: 'string', example: 'Updated job description...' },
        location: { type: 'string', example: 'San Francisco, CA' },
        salary: { type: 'number', example: 100000 },
        status: { type: 'string', example: 'OPEN' },
      },
    },
  },
  
  jobDeleted: {
    status: 200,
    description: 'Job deleted successfully',
  },
}; 