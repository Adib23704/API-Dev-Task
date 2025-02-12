import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DB_FILE = path.resolve(process.cwd(), 'db.json');

export function readDatabase() {
	try {
		if (!fs.existsSync(DB_FILE)) return [];
		const data = fs.readFileSync(DB_FILE, 'utf8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading database:', error);
		return [];
	}
}

export function writeDatabase(data) {
	try {
		fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
	} catch (error) {
		console.error('Error writing to database:', error);
	}
}
