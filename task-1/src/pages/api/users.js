import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticate } from '@/middleware/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			await authenticate(req, res, async () => await getUsers(req, res));
			break;
		case 'POST':
			await addUser(req, res);
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

async function getUsers(req, res) {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users.map(({ password, ...user }) => user));

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching users' });
	}
}

async function addUser(req, res) {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	try {
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

		res.status(201).json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			}, token
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating user' });
	}
}
