import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
    out: './db/migration',
    schema: './db/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
        ssl: { rejectUnauthorized: true }
    },
});
