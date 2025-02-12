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
