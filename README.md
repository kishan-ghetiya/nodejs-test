# User Management API

This is a RESTful API built with **Node.js, Express.js, MySQL, Redis, and JWT**. It provides basic **CRUD (Create, Read, Update, Delete)** operations for managing users with **role-based access control (RBAC)**.

## Features
- ✅ JWT Authentication
- ✅ Role-based Access Control (RBAC)
- ✅ MySQL database with schema migrations
- ✅ API Caching with Redis
- ✅ Custom Error Handling
- ✅ Data Validation with Joi
- ✅ Unit Testing with Mocha
- ✅ Docker Containerization
- ✅ API Versioning

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **MySQL** (v5.7 or later)
- **Redis** (v6 or later)

## Setup Instructions

### 1️⃣ Clone the Repository
```
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
```

### 2️⃣ Set Up MySQL
Create a database named `user_management`:
```
CREATE DATABASE user_management;
```

Create a `.env` file in the root directory with the following environment variables:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=user_management
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3️⃣ Run Database Migrations
Run the migration script to create the necessary tables:
```
node migrations/create-users-table.js
```

### 4️⃣ Seed the Database (Optional)
Seed the database with initial data:
```
node scripts/seed.js
```

### 5️⃣ Run the API
Start the server locally:
```
npm start
```
The API will be available at [http://localhost:3000](http://localhost:3000).

### 6️⃣ Docker Setup (Optional)
To run the application with Docker:
```
docker-compose up --build
```
This will start the **Node.js app, MySQL database, and Redis cache** in Docker containers.

### 7️⃣ Running Tests
To run unit tests with Mocha:
```
npm test
```

### 8️⃣ API Documentation
If Swagger is set up, access the API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

| Method | Endpoint        | Description                   | Access  |
|--------|----------------|-------------------------------|---------|
| POST   | `/users`       | Create a new user            | Admin   |
| GET    | `/users`       | Retrieve all users           | Public  |
| GET    | `/users/:id`   | Retrieve a user by ID        | Public  |
| PUT    | `/users/:id`   | Update a user                | Admin   |
| DELETE | `/users/:id`   | Delete a user                | Admin   |

## Design Decisions

- **JWT Authentication** → Ensures only authenticated users can access the API.
- **Role-based Access Control (RBAC)** → Admin users can create, update, and delete users.
- **Redis Caching** → Optimizes performance for `GET /users` and `GET /users/:id`.

## Troubleshooting

### Common Errors & Fixes

🔴 **Error:** `Authorization header is missing`

✅ **Fix:** Ensure that your requests include the `Authorization` header with a valid JWT token.

Example:
```
curl -X GET http://localhost:3000/api/v1/users \  
     -H "Authorization: Bearer your_jwt_token"
```

### Running Migrations & Seeding Data

To apply migrations:
```
node migrations/create-users-table.js
```

To seed data:
```
node scripts/seed.js
```

📌 Be sure to check if the **users** table is created and populated correctly after running these scripts.

---
