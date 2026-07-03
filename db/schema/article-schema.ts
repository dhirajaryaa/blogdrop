import { pgTable, uuid, text, timestamp, jsonb, index, uniqueIndex, integer, unique, pgEnum } from "drizzle-orm/pg-core";
import { source } from "./source-schema";
import { relations } from "drizzle-orm";

export const articleStatusEnum = pgEnum("article_status", [
    "pending",      // RSS se mila, process nahi hua
    "processing",   // Harvester/AI pipeline chal rahi hai
    "completed",    // Successfully process ho gaya 
]);

export const article = pgTable("article", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    originalUrl: text("original_url").notNull().unique(),
    sourceId: uuid("source_id")
        .notNull()
        .references(() => source.id),
    content: text("content").default(""),
    author: text("author").notNull(),
    publicAt: text("public_at").notNull(),
    imageUrl: text("image_url").default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    status: articleStatusEnum().default("pending"),
    slug: text("slug").notNull().unique(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
},
    (table) => [
        index("article_source_idx").on(table.sourceId),
        index("article_published_idx").on(table.publicAt),
        uniqueIndex("article_url_idx").on(table.originalUrl),
    ]);


export const articleMetaData = pgTable("article_metadata", {
    id: uuid("id").primaryKey().defaultRandom(),
    articleId: uuid("article_id")
        .notNull()
        .references(() => article.id, {
            onDelete: "cascade",
        }),
    summary: text("summary"),
    categories: text("categories").array().default([]),
    tags: text("tags").array().default([]),
    keyTakeaways: text("key_takeaways").array().default([]),
    difficulty: text("difficulty").default("junior"), //[junior / mid / senior]
    whyRead: text("why_read").default(""),
    readingTime: integer("reading_time").default(2), // in minutes
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
}, ((table) => [
    unique("article_metadata_article_id_unique").on(table.articleId),
]));

// relation ship 
export const articleRelations = relations(article, ({ one }) => ({
    metadata: one(articleMetaData, {
        fields: [article.id],
        references: [articleMetaData.articleId]
    }),
    source: one(source, {
        fields: [article.sourceId],
        references: [source.id]
    })
}))