ALTER TABLE "article_metadata" ALTER COLUMN "tags" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "tags" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "tags" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "key_takeaways" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "key_takeaways" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "key_takeaways" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "why_read" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "user_categories" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "user_tags" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "article_metadata" ADD COLUMN "categories" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "user_interest";