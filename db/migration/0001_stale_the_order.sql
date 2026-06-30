ALTER TABLE "article_metadata" ALTER COLUMN "summary" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "tags" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "key_takeaways" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "why_read" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "reading_time" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "reading_time" SET DEFAULT 2;--> statement-breakpoint
ALTER TABLE "article_metadata" ADD CONSTRAINT "article_metadata_article_id_unique" UNIQUE("article_id");