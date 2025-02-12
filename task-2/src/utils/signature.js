import crypto from 'node:crypto';

export function verifySignature(req, body) {
	const signature = req.headers['x-signature'];
	if (!signature) return false;

	try {
		const hmac = crypto.createHmac('sha256', process.env.SECRET);
		hmac.update(body, 'utf8');
		const digest = hmac.digest('hex');
		return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(digest, 'hex'));
	} catch (error) {
		console.error('Error verifying signature:', error);
		return false;
	}
}
