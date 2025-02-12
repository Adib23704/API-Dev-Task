## Table of Contents
- Task 1
  - Features
  - Tech-Stack
  - Getting Started
  - Environment Variables
  - API Routes
  - Authentication Middleware
  - Database Schema
- Task 2
  - Features
  - Tech-Stack
  - Getting Started
  - Environment Variables
  - Webhook Implementation
  - Database Operations
  - Signature Verification

## Task 1

### Features
- **CRUD operations**
- **JWT-based Authentication**
- **Password Hashing with bcrypt**
- **Prisma ORM for Database Management**

### Tech-Stack
- [Next.js](https://nextjs.org/) - Framework for building APIs and frontend
- [Prisma](https://www.prisma.io/) - Database ORM
- [SQLite](https://www.sqlite.org/) - SQL database
- [bcrypt](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT authentication

### Getting Started

#### 1. Clone the Repository
```bash
git clone https://github.com/Adib23704/API-Dev-Task
cd API-Dev-Task/task-1
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Set Up the Database
1. Initialize Prisma:
   ```bash
   npx prisma init
   ```
2. Apply the schema:
   ```bash
   npx prisma migrate dev --name init
   ```

#### 4. Run the Development Server
```bash
npm run dev
```

### Environment Variables
Create a .env file in the project root and add the following:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
```

### API Routes

#### **GET /api/users**
Fetch all users (requires JWT authentication).
```http
GET /api/users
Authorization: Bearer <token>
```
##### Response:
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

#### **POST /api/users**
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
##### Response:
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

#### **GET /api/users/:id**
Fetch a single user by ID (requires JWT authentication).
```http
GET /api/users/1
Authorization: Bearer <token>
```
##### Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
	"createdAt": "2025-02-11T18:46:25.310Z"
}
```

### Authentication Middleware
The authentication middleware is implemented in `authMiddleware`. It verifies the JWT token and attaches the decoded user information to the request object.

### Database Schema
The database schema is managed by Prisma and defined in `schema.prisma`.
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

## Task 2

### Features
- **Webhook Endpoint**
- **Signature Verification**
- **Database Operations**

### Tech-Stack
- [Fastify](https://www.fastify.io/) - Web framework for Node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management

### Getting Started

#### 1. Clone the Repository
```bash
git clone https://github.com/Adib23704/API-Dev-Task
cd API-Dev-Task/task-2
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Run the Development Server
```bash
npm run dev
```

### Environment Variables
Create a .env file in the project root and add the following:
```env
PORT=3000
SECRET=your_secret_key
```

### Webhook Implementation
The webhook endpoint is implemented in `app.js`. It listens for POST requests at `/api/webhook` and verifies the signature of the incoming request.

### Database Operations
Database operations are handled by `database.js`. It reads from and writes to a JSON file (`db.json`) to store event data.

### Signature Verification
Signature verification is implemented in `signature.js`. It uses HMAC with SHA-256 to verify the integrity and authenticity of the incoming request.

### Generate Signature
You can generate a signature for testing purposes using `generateSignature.js`. This script creates a HMAC signature for a given payload using the secret key.

```bash
node generateSignature.js
```

This will output the generated signature and the payload to the console.
