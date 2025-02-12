import 'dotenv/config'
import Fastify from 'fastify';
import { verifySignature } from './utils/signature.js';
import { readDatabase, writeDatabase } from './utils/database.js';

const fastify = Fastify({
	bodyLimit: 100 * 1024 * 1024,
	logger: {
		transport: {
			target: '@fastify/one-line-logger',
			colorize: true
		}
	}
})

const port = process.env.PORT || 3000;

async function handleWebhook(req, reply) {
	const rawBody = JSON.stringify(req.body);

	if (!verifySignature(req, rawBody)) {
		return reply.status(401).send({ success: false, message: 'Invalid signature' });
	}

	const { eventType, data } = req.body;
	if (!eventType || !data) {
		return reply.status(400).send({ success: false, message: 'Invalid payload' });
	}

	const db = readDatabase();
	db.push({ eventType, data, timestamp: new Date().toISOString() });
	writeDatabase(db);

	return reply.send({ success: true, message: 'Received' });
}

fastify.post('/api/webhook', handleWebhook);

fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
});
