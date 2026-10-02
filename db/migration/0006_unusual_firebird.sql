ALTER TYPE "public"."article_status" ADD VALUE 'failed';--> statement-breakpoint
CREATE TABLE "ai_usage" (
	"day" text PRIMARY KEY NOT NULL,
	"used" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_article_id_article_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;