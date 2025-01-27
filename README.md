User Management API
This is a RESTful API built with Node.js, Express.js, MySQL, Redis, and JWT. It provides basic CRUD (Create, Read, Update, Delete) operations for managing users with role-based access control.

Features
JWT Authentication
Role-based Access Control (RBAC)
MySQL database with schema migrations
API Caching with Redis
Custom Error Handling
Data Validation with Joi
Unit Testing with Mocha
Docker Containerization
API Versioning
Prerequisites
Before setting up the project, make sure you have the following installed:

Node.js (v16 or later)
MySQL (v5.7 or later)
Redis (v6 or later)
Setup Instructions
1. Clone the Repository
Clone the repository and navigate into the project directory:

bash
Copy
Edit
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
2. Set up MySQL
Create a database named user_management:

sql
Copy
Edit
CREATE DATABASE user_management;
Create a .env file in the root directory with the following environment variables:

env
Copy
Edit
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=user_management
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
Make sure to replace your_jwt_secret with a secure secret key for JWT authentication.

3. Run Database Migrations
Run the migration scripts to create the necessary tables in the MySQL database:

bash
Copy
Edit
node migrations/create-users-table.js
4. Seed the Database (Optional)
You can seed the database with initial data using the following command:

bash
Copy
Edit
node scripts/seed.js
5. Run the API Locally
Start the server locally:

bash
Copy
Edit
npm start
The API will be available at http://localhost:3000.

6. Docker Setup
To run the application with Docker, use the following command:

bash
Copy
Edit
docker-compose up --build
This will start the Node.js app, MySQL database, and Redis cache in Docker containers.

7. Running Tests
To run the unit tests with Mocha:

bash
Copy
Edit
npm test
8. API Documentation
You can access the Swagger API documentation at:

bash
Copy
Edit
http://localhost:3000/api-docs
(This assumes that Swagger is set up in the project for API documentation.)

API Endpoints
POST /users
Description: Create a new user (Admin only).
Request Body:
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "admin"
}
Response:
Status Code: 201
Response Body: The created user details
GET /users
Description: Retrieve all users.
Response:
Status Code: 200
Response Body: List of all users
GET /users/:id
Description: Retrieve a single user by ID.
Response:
Status Code: 200 (If user is found)
Status Code: 404 (If user is not found)
Response Body: The user details
PUT /users/:id
Description: Update a user (Admin only).
Request Body:
json
Copy
Edit
{
  "name": "Updated Name",
  "email": "updated.email@example.com",
  "password": "newpassword123",
  "role": "user"
}
Response:
Status Code: 200
Response Body: The updated user details
DELETE /users/:id
Description: Delete a user (Admin only).
Response:
Status Code: 204 (No content)
Design Decisions
JWT Authentication: Ensures that only authenticated users can access the API.
Role-based Access Control (RBAC): Ensures that only users with the admin role can create, update, or delete users.
Redis Caching: Reduces database queries for frequently accessed endpoints like GET /users and GET /users/:id.
Assumptions
The API is expected to run in a development environment where MySQL and Redis are available.
It is assumed that the Docker container is properly configured for local development and production environments.
Troubleshooting
If you encounter any issues, verify that:

MySQL and Redis are running and properly configured.
The .env file has all the necessary environment variables configured correctly.
The API endpoints are being accessed correctly (e.g., correct method, route, and headers).