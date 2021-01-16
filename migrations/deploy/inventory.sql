-- Deploy inventa_db:inventory to pg

BEGIN;

-- Update updatedAt function
CREATE OR REPLACE FUNCTION trigger_inventories_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Inventories table
CREATE SEQUENCE inventa.inventories_id_seq;
CREATE TABLE inventa.inventories
(
  id integer NOT NULL DEFAULT nextval('inventa.inventories_id_seq'::regclass),
  "name" text NOT NULL,
  "description" text NOT NULL,
  "category" character varying(50),
  "s3Id" text,
  "s3ThumbnailId" text,
  "serialNumber" text UNIQUE,
  "status" character varying(50),
  "cost" text,
  "salePrice" text,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT inventories_pkey PRIMARY KEY (id),
  CONSTRAINT "inventories_status_fkey" FOREIGN KEY ("status")
        REFERENCES inventa.status ("name") MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL,
  CONSTRAINT "inventories_category_fkey" FOREIGN KEY ("category")
        REFERENCES inventa.categories ("name") MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
);

-- Trigger update
CREATE TRIGGER set_inventories_timestamp
BEFORE UPDATE ON inventa.inventories
FOR EACH ROW
EXECUTE PROCEDURE trigger_inventories_set_timestamp();

COMMIT;
