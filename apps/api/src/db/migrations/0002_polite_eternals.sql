ALTER TABLE "clients" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "address" text;