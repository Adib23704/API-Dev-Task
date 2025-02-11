# User Management API with JWT Authentication [TASK - 1]

A basic API implementation using JWT support to handle user record management through Next.js. The API maintains data communication with a SQLite database controlled by Prisma.

## Table of Contents
- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Authentication Middleware](#authentication-middleware)
- [Database Schema](#database-schema)
- [Improvements](#improvements)

## Features
- **CRUD operations**
- **JWT-based Authentication**
- **Password Hashing with bcrypt**
- **Prisma ORM for Database Management**

## Tech-Stack
- [Next.js](https://nextjs.org/) - Framework for building APIs and frontend
- [Prisma](https://www.prisma.io/) - Database ORM
- [SQLite](https://www.sqlite.org/) - SQL database
- [bcrypt](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT authentication

## Getting Started

### **1. Clone the Repository**
```bash
git clone https://github.com/Adib23704/API-Dev-Task
cd API-Dev-Task
cd task-1
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up the Database**
1. Initialize Prisma:
   ```bash
   npx prisma init
   ```
2. Apply the schema:
   ```bash
   npx prisma migrate dev --name init
   ```

### **4. Run the Development Server**
```bash
npm run dev
```

## Environment Variables
Create a `.env` file in the project root and add the following:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
```

## API Routes

### **GET /api/users**
Fetch all users (requires JWT authentication).
```http
GET /api/users
Authorization: Bearer <token>
```
#### Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
		"createdAt": "2025-02-11T18:46:25.310Z"
  }
]
```

### **POST /api/users**
Add a new user.
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  },
  "token": "eyJhb...."
}
```

### **GET /api/users/:id**
Fetch a single user by ID (requires JWT authentication).
```http
GET /api/users/1
Authorization: Bearer <token>
```
#### Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
	"createdAt": "2025-02-11T18:46:25.310Z"
}
```

## Database Schema
The database schema is managed by Prisma.
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

