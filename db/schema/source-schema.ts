import { pgTable, uuid, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";


export const source = pgTable("source", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    rssUrl: text("rss_url").unique(),
    siteUrl: text("site_url").default(""),
    sitemapUrl: text("sitemap_url").default(""),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()

});

export const statusEnum = pgEnum("status", ["pending", "active", "done", "failed", "error"]);


export const sourceQueue = pgTable("source_queue", {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
        .notNull()
        .references(() => source.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    status: statusEnum().default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
})