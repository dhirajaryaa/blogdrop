ALTER TABLE "article" ADD COLUMN "processing_batch_id" text;--> statement-breakpoint
CREATE INDEX "article_status_batch_idx" ON "article" USING btree ("status","processing_batch_id");