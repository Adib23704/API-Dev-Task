import crypto from 'node:crypto';

export function verifySignature(req, body) {
	const signature = req.headers['x-signature'];
	if (!signature) return false;

	const hmac = crypto.createHmac('sha256', process.env.SECRET);
	hmac.update(body);
	const digest = hmac.digest('hex');

	return signature === digest;
}
