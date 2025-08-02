export const ApplicationsSwaggerExamples = {
  applicationList: {
    status: 200,
    description: 'Applications retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          jobId: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          userId: { type: 'string', example: '1' },
          resumeText: {
            type: 'string',
            example: 'Experienced software engineer...',
          },
          coverLetter: { type: 'string', example: 'I am excited to apply...' },
          status: { type: 'string', example: 'PENDING' },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        },
      },
    },
  },

  singleApplication: {
    status: 200,
    description: 'Application retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        jobId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        userId: { type: 'string', example: '1' },
        resumeText: {
          type: 'string',
          example: 'Experienced software engineer...',
        },
        coverLetter: { type: 'string', example: 'I am excited to apply...' },
        status: { type: 'string', example: 'PENDING' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  },

  userApplications: {
    status: 200,
    description: 'User applications retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          jobId: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          userId: { type: 'string', example: '1' },
          resumeText: {
            type: 'string',
            example: 'Experienced software engineer...',
          },
          coverLetter: { type: 'string', example: 'I am excited to apply...' },
          status: { type: 'string', example: 'PENDING' },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        },
      },
    },
  },

  applicationCreated: {
    status: 201,
    description: 'Application created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        jobId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        userId: { type: 'string', example: '1' },
        resumeText: {
          type: 'string',
          example: 'Experienced software engineer...',
        },
        coverLetter: { type: 'string', example: 'I am excited to apply...' },
        status: { type: 'string', example: 'PENDING' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  },

  statusUpdated: {
    status: 200,
    description: 'Application status updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        status: { type: 'string', example: 'ACCEPTED' },
        updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  },
};
