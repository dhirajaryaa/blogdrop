ALTER TABLE "article_category" DROP CONSTRAINT "article_category_unique";--> statement-breakpoint
ALTER TABLE "article_tag" DROP CONSTRAINT "article_tag_unique";--> statement-breakpoint
ALTER TABLE "article_category" ADD CONSTRAINT "article_category_article_id_category_id_pk" PRIMARY KEY("article_id","category_id");--> statement-breakpoint
ALTER TABLE "article_tag" ADD CONSTRAINT "article_tag_article_id_tag_id_pk" PRIMARY KEY("article_id","tag_id");