LOCK TABLE "user_category" IN SHARE ROW EXCLUSIVE MODE;
--> statement-breakpoint
DELETE FROM "user_category" AS "duplicate"
USING "user_category" AS "original"
WHERE "duplicate"."user_id" = "original"."user_id"
	AND "duplicate"."category_id" = "original"."category_id"
	AND "duplicate"."ctid" < "original"."ctid";
--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_user_id_category_id_pk" PRIMARY KEY("user_id","category_id");