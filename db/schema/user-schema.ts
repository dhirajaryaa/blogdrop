import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { account, session } from "./auth-schema";
import { relations } from "drizzle-orm";
import { bookmark } from "./article-schema";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),

    about: text("about"),
    onboarded: boolean("onboarded").default(false),
    categories: text("user_categories").array().default([]),
    tags: text("user_tags").array().default([]),
    experienceLevel: text("experience_level").default("mid"), // [ junior / mid / senior]

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  bookmarks : many(bookmark)
}));