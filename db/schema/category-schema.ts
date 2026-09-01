import { integer, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { article } from "./article-schema";
import { relations } from "drizzle-orm";


//! category 
export const category = pgTable("category", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique()
})

//! article-category
export const articleCategory = pgTable("article_category", {
    articleId: uuid("article_id")
        .notNull()
        .references(() => article.id, {
            onDelete: "cascade",
        }),
    categoryId: integer("category_id")
        .notNull()
        .references(() => category.id, {
            onDelete: "cascade"
        })
},
    (table) => [unique("article_category_unique").on(table.articleId, table.categoryId)]
);

//? article category relation
export const articleCategoryRelations = relations(articleCategory, ({ one }) => ({
    article: one(article, {
        fields: [articleCategory.articleId],
        references: [article.id],
    }),

    category: one(category, {
        fields: [articleCategory.categoryId],
        references: [category.id],
    }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
    articles: many(articleCategory),
}));