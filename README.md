# User Management API

This is a RESTful API built with Node.js, Express.js, MySQL, Redis, and JWT. It provides basic CRUD (Create, Read, Update, Delete) operations for managing users with role-based access control.

## Features:
- JWT Authentication
- Role-based Access Control (RBAC)
- MySQL database with schema migrations
- API Caching with Redis
- Custom Error Handling
- Data Validation with Joi
- Unit Testing with Mocha
- Docker Containerization
- API Versioning

## Prerequisites:
- Node.js (v16 or later)
- MySQL (v5.7 or later)
- Redis (v6 or later)

## Setup Instructions:

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
2. Set up MySQL:
Create a database named user_management:

sql
Copy
Edit
CREATE DATABASE user_management;
Create a .env file in the root directory with the following environment variables:

bash
Copy
Edit
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=user_management
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
3. Run Database Migrations:
Run migration scripts to create the necessary tables.

bash
Copy
Edit
node migrations/create-users-table.js
4. Seed the Database (optional):
You can seed the database with some initial data using the following command:

bash
Copy
Edit
node scripts/seed.js
These commands will set up the database schema and populate initial data. Be sure to test your migrations by checking if the users table is created and populated after running these scripts.

5. Run the API:
Start the server locally:

bash
Copy
Edit
npm start
The API will be available at http://localhost:3000.

6. Docker Setup:
To run the application with Docker, use the following command:

bash
Copy
Edit
docker-compose up --build
This will start the Node.js app, MySQL database, and Redis cache in Docker containers.

7. Running Tests:
To run the unit tests with Mocha:

bash
Copy
Edit
npm test
8. API Documentation:
You can access the Swagger API documentation at http://localhost:3000/api-docs (if Swagger is set up in the project).

API Endpoints:
POST /users: Create a new user (Admin only).
GET /users: Retrieve all users.
GET /users/:id: Retrieve a single user by ID.
PUT /users/:id: Update a user (Admin only).
DELETE /users/:id: Delete a user (Admin only).
Design Decisions:
JWT Authentication: Ensures that only authenticated users can access the API.
Role-based Access Control: Ensures that only users with the admin role can create, update, or delete users.
Redis Caching: Reduces database queries for frequently accessed endpoints like GET /users and GET /users/:id.
Assumptions:
The API is expected to run in a development environment where MySQL and Redis are available.
It is assumed that the Docker container is properly configured for local development and production environments.
Troubleshooting:
Common Errors:
Authorization header is missing: If you are getting this error, ensure that your requests include the Authorization header with a valid JWT token.

Example:

bash
Copy
Edit
curl -X GET http://localhost:3000/api/v1/users \
-H "Authorization: Bearer your_jwt_token"
9. Running Migrations and Seed Data:
To run migrations and seed data, you can create simple scripts as mentioned earlier. To apply the migration:

bash
Copy
Edit
node migrations/create-users-table.js
To seed data, run:

bash
Copy
Edit
node scripts/seed.js
These commands will set up the database schema and populate initial data. Be sure to test your migrations by checking if the users table is created and populated after running these scripts.