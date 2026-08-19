import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./schema"


export const db = drizzle(process.env.DATABASE_URL!,
    {
        casing: "camelCase",
        // Todo: setup schema and one file import so relation build easy
        schema 
    }
);
