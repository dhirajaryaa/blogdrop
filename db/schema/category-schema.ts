import { integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { article } from "./article-schema";
import { relations } from "drizzle-orm";
import { user } from "./user-schema";


//! category 
export const category = pgTable("category", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique()
})

//! article-category
export const articleCategory = pgTable(
    "article_category",
    {
        articleId: uuid("article_id")
            .notNull()
            .references(() => article.id, {
                onDelete: "cascade",
            }),

        categoryId: integer("category_id")
            .notNull()
            .references(() => category.id, {
                onDelete: "cascade",
            }),
    },
    (table) => [
        primaryKey({
            columns: [table.articleId, table.categoryId],
        }),
    ]
);

//! user-category
export const userCategory = pgTable("user_category", {
    categoryId: integer("category_id")
        .notNull()
        .references(() => category.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
}, (table) => [
    primaryKey({
        name: "user_category_user_id_category_id_pk",
        columns: [table.userId, table.categoryId],
    }),
]);

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

//? user category relation
export const userCategoryRelations = relations(userCategory, ({ one }) => ({
    category: one(category, {
        fields: [userCategory.categoryId],
        references: [category.id],
    }),

    user: one(user, {
        fields: [userCategory.userId],
        references: [user.id],
    }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
    articles: many(articleCategory),
    users: many(userCategory)
}));