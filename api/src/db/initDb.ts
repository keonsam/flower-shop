import { initDb } from './dbConnection';

async function runMigrations() {
	try {
		await initDb();
		process.exit(0);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

runMigrations();
