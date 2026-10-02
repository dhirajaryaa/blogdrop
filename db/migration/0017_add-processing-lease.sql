ALTER TABLE "article" ADD COLUMN "processing_lease_expires_at" timestamp;--> statement-breakpoint
UPDATE "article" SET status = 'pending', processing_batch_id = NULL WHERE status = 'processing' AND processing_lease_expires_at IS NULL;--> statement-breakpoint
CREATE INDEX "article_status_lease_idx" ON "article" USING btree ("status","processing_lease_expires_at");