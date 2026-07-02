import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    user: {
        additionalFields: {
            onboarded: {
                type: "boolean",
                required: true,
                input: false,
                defaultValue: false
            },
            experienceLevel: {
                type: ["mid", "junior", "senior"],
                required: true,
                defaultValue: "junior",
                input: false
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    }
});