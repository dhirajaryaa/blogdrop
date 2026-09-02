CREATE TYPE "public"."article_status" AS ENUM('pending', 'processing', 'done', 'failed', 'error');--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "status" SET DATA TYPE "public"."article_status" USING "status"::text::"public"."article_status";--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "status" SET DEFAULT 'pending';