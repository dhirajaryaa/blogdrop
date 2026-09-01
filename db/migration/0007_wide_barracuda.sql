CREATE TABLE "article_category" (
	"article_id" uuid NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "article_category_unique" UNIQUE("article_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "article_tag" (
	"article_id" uuid NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "article_tag_unique" UNIQUE("article_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "tag_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "source_queue" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "source_queue" CASCADE;--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::text::"public"."status";--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "ai_usage" ADD COLUMN "api_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "article_category" ADD CONSTRAINT "article_category_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_category" ADD CONSTRAINT "article_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tag" ADD CONSTRAINT "article_tag_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tag" ADD CONSTRAINT "article_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_metadata" DROP COLUMN "categories";--> statement-breakpoint
ALTER TABLE "article_metadata" DROP COLUMN "tags";--> statement-breakpoint
DROP TYPE "public"."article_status";