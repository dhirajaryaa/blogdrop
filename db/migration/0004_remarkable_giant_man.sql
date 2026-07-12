ALTER TABLE "article_metadata" ALTER COLUMN "categories" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "categories" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article_metadata" ALTER COLUMN "categories" SET NOT NULL;