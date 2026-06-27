import { pgTable, uuid, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { source } from "./source-schema";

export const article = pgTable("article", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    originalUrl: text("original_url").notNull(),
    sourceId: uuid("source_id")
        .notNull()
        .references(() => source.id),
    content: varchar("content", { length: 5000 }).default(""),
    author: text("author").notNull(),
    publicAt: text("public_at").notNull(),
    imageUrl: text("image_url").default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});


export const articleMetaData = pgTable("article_metadata", {
    id: uuid("id").primaryKey().defaultRandom(),
    articleId: uuid("article_id")
        .notNull()
        .references(() => article.id, { onDelete: "cascade" }),
    summary: text("summary").default(""),
    tags: jsonb("tags").$type<string[]>().default([]),
    keyTakeaways: jsonb("key_takeaways").$type<string[]>().default([]),
    difficulty: text("difficulty").default("junior"), //[junior / mid / senior]
    whyRead: text("why_read").default(""),
    readingTime: text("reading_time").default("2"), // in minutes
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});