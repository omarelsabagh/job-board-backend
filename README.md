<p align="center">
  <h1 align="center">Job Board Backend</h1>
  <p align="center">A robust backend service for a job board application built with NestJS</p>
</p>

## Description

This is the backend service for a job board application that connects job seekers with employers. It provides RESTful APIs for user authentication, job postings, and application management.

## Technologies Used

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT with Passport.js
- **API Documentation**: OpenAPI (Swagger) with organized examples
- **Validation**: class-validator
- **Security**: Helmet, CORS, CSRF protection
- **Testing**: Jest
- **Environment Management**: dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git
- Docker and Docker Compose (for containerized development)

### Installation

#### Option 1: Local Development (without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board-backend.git
   cd job-board-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other configuration.

4. **Set up the database**
   ```bash
   # Apply database migrations
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   
   # Seed the database with initial admin user
   npx prisma db seed
   ```

#### Option 2: Docker Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board-backend.git
   cd job-board-backend
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your preferred configuration.

3. **Start the application with Docker**
   ```bash
   # Build and start the containers
   npm run docker:build
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database
   - NestJS application
   - pgAdmin (database management tool)

### Running the application

#### Local Development

```bash
# development
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

#### Docker Development

```bash
# Start services
$ npm run docker:up

# View logs
$ npm run docker:logs

# Stop services
$ npm run docker:down

# Rebuild containers (after making changes to Dockerfile)
$ npm run docker:build
```

#### Accessing Services

- **Application**: http://localhost:3000
- **API Documentation (Swagger)**: http://localhost:3000/api
- **pgAdmin**: http://localhost:5050
  - Email: admin@example.com (or as set in `.env`)
  - Password: admin (or as set in `.env`)

### Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📚 API Documentation

### Swagger UI

The API documentation is automatically generated using Swagger/OpenAPI and is available at:

**http://localhost:3000/api**

### Features

- **Interactive Documentation**: Test API endpoints directly from the browser
- **Authentication**: Bearer token authentication for protected routes
- **Request/Response Examples**: Realistic examples for all endpoints
- **Organized by Tags**: Endpoints are grouped by functionality:
  - **Authentication**: Login/logout operations
  - **Users**: User registration and management
  - **Jobs**: Job CRUD operations
  - **Applications**: Job application management

### Using the API

1. **Start the application**: `npm run start:dev`
2. **Open Swagger UI**: Navigate to `http://localhost:3000/api`
3. **Register a user**: Use the `/users/register` endpoint
4. **Login**: Use the `/auth/login` endpoint to get authentication
5. **Explore endpoints**: All endpoints are documented with examples

### Project Structure for Swagger

The Swagger documentation is organized in a clean, maintainable structure:

```
src/modules/
├── auth/
│   ├── swagger/
│   │   └── auth.swagger.ts          # Authentication examples
│   ├── auth.controller.ts
│   └── dto/
├── users/
│   ├── swagger/
│   │   └── users.swagger.ts         # User management examples
│   ├── users.controller.ts
│   └── dto/
├── jobs/
│   ├── swagger/
│   │   └── jobs.swagger.ts          # Job CRUD examples
│   ├── jobs.controller.ts
│   └── dto/
└── applications/
    ├── swagger/
    │   └── applications.swagger.ts   # Application examples
    ├── applications.controller.ts
    └── dto/
```

### API Endpoints Overview

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout (requires authentication)

#### Users
- `POST /users/register` - Register new user
- `GET /users` - Get all users (Admin only)

#### Jobs
- `GET /jobs` - Get all jobs with optional filters
- `GET /jobs/:id` - Get specific job
- `POST /jobs` - Create new job (Admin only)
- `PATCH /jobs/:id` - Update job (Admin only)
- `DELETE /jobs/:id` - Delete job (Admin only)

#### Applications
- `GET /applications/my` - Get user's applications (Job Seeker only)
- `GET /applications/:id` - Get specific application
- `POST /applications` - Create job application (Job Seeker only)
- `GET /applications/job/:jobId` - Get applications for job (Admin only)
- `PATCH /applications/:id/status` - Update application status (Admin only)

## 🔧 Assumptions Made

1. **User Roles**:
   - The system has two types of users: `ADMIN` and `JOBSEEKER`
   - Job seekers can register through the application
   - Admin users must be created manually through the database seed process

2. **Job Application Flow**:
   - Only authenticated job seekers can apply to jobs
   - Job postings can only be created by admin users
   - Applications go through statuses: SUBMITTED → REVIEWED → ACCEPTED/REJECTED

3. **Security**:
   - All sensitive routes are protected with JWT authentication
   - Password hashing is implemented using bcrypt
   - CORS is configured to only allow requests from trusted origins

## 📝 Known Limitations

1. **Admin Management**:
   - No API endpoint for admin user creation (must be done via seed script)
   - Limited role management capabilities

2. **Features for Future Implementation**:
   - Password reset functionality
   - Email notifications
   - File upload for resumes
   - Advanced search and filtering for jobs
   - Rate limiting for API endpoints
   - More granular user permissions

3. **Performance Considerations**:
   - No caching layer implemented
   - No pagination for large result sets
   - Basic error handling that could be more descriptive

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding New API Endpoints

When adding new endpoints, follow the established pattern:

1. **Create Swagger examples** in the module's `swagger/` directory
2. **Use the examples** in your controller with `@ApiResponse(ModuleSwaggerExamples.exampleName)`
3. **Keep controllers clean** by moving complex response schemas to swagger files
4. **Add proper documentation** with `@ApiOperation` and `@ApiTags`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the database ORM
- [Swagger](https://swagger.io/) for API documentation
- All contributors who have helped improve this project
