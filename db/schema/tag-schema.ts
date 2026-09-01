import { integer, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { article } from "./article-schema";
import { relations } from "drizzle-orm";

//! tags 
export const tag = pgTable("tag", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique()
});

//! article-tag
export const articleTag = pgTable("article_tag", {
    articleId: uuid("article_id")
        .notNull()
        .references(() => article.id, { onDelete: "cascade" }),

    tagId: integer("tag_id")
        .notNull()
        .references(() => tag.id, { onDelete: "cascade" }),
},
    (table) => [
        unique("article_tag_unique").on(table.articleId, table.tagId),
    ],);

//? article tag relation
export const articleTagRelations = relations(articleTag, ({ one }) => ({
    article: one(article, {
        fields: [articleTag.articleId],
        references: [article.id],
    }),

    tag: one(tag, {
        fields: [articleTag.tagId],
        references: [tag.id],
    }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
    articles: many(articleTag),
}));