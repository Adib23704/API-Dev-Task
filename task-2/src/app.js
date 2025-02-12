import 'dotenv/config'
import Fastify from 'fastify';

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
	return reply.send({ success: true, message: 'Received' });
}

fastify.post('/api/webhook', handleWebhook);

fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
});
