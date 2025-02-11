import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/middleware/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			await getUserById(req, res);
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

async function getUserById(req, res) {
	const { id } = req.query;

	if (!id) return res.status(400).json({ message: 'User ID is required' });

	try {
		const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
		if (!user) return res.status(404).json({ message: 'User not found' });

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching user' });
	}
}
