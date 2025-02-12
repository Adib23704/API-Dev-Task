import 'dotenv/config';
import crypto from 'node:crypto';

const SECRET = process.env.SECRET;

const payload = JSON.stringify({
	eventType: "user_signup",
	data: {
		userId: 12345,
		email: "user@example.com"
	}
});

const hmac = crypto.createHmac('sha256', SECRET);
hmac.update(payload);
const signature = hmac.digest('hex');

console.log(`Generated Signature: ${signature}`);
console.log('Payload:');
console.log(JSON.parse(payload));
