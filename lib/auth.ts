import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    user: {
        additionalFields: {
            about: {
                type: "string",
                required: false,
                defaultValue: "",
                input: false
            },
            userInterests: {
                type: "string[]",
                required: false,
                defaultValue: [],
                input: false
            },
            experienceLevel: {
                type: ["mid", "junior", "senior"],
                required: true,
                defaultValue: "junior",
                input: false
            }
        }
    }
});