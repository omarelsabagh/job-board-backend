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
- **API Documentation**: OpenAPI (Swagger)
- **Validation**: class-validator
- **Security**: Helmet, CORS, CSRF protection
- **Testing**: Jest
- **Environment Management**: dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database
- Git

### Installation

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
   
   # Seed the database with initial admin user
   npx prisma db seed
   ```

### Running the application

```bash
# development
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

### Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

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

## 📚 API Documentation

API documentation is available via Swagger UI when running in development mode:
- Access the Swagger UI at: `http://localhost:3000/api` (adjust port if needed)
- All API endpoints are prefixed with `/api`
- Authentication is required for protected routes (use the login endpoint to get a JWT token)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the database ORM
- All contributors who have helped improve this project
