CREATE TYPE "public"."article_status" AS ENUM('pending', 'processing', 'completed');--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "status" "article_status" DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_slug_unique" UNIQUE("slug");