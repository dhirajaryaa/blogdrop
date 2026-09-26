import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./schema"


export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL as string,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: true }
            : false,
    },
    casing: "camelCase",
    schema,
});
