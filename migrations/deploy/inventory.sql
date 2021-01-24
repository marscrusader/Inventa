-- Deploy inventa_db:inventory to pg

BEGIN;

-- Update updated_at function
CREATE OR REPLACE FUNCTION trigger_inventories_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Inventories table
CREATE SEQUENCE inventa.inventories_id_seq;
CREATE TABLE inventa.inventories
(
  id integer NOT NULL DEFAULT nextval('inventa.inventories_id_seq'::regclass),
  "name" text NOT NULL,
  "description" text,
  "category" character varying(50),
  "collectionId" integer NOT NULL,
  "s3Id" text,
  "s3ThumbnailId" text,
  "serialNumber" text UNIQUE,
  "status" character varying(50),
  "cost" integer,
  "salePrice" integer,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT inventories_pkey PRIMARY KEY (id),
  CONSTRAINT "inventories_collection_fkey" FOREIGN KEY ("collectionId")
        REFERENCES inventa.collections (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Trigger update
CREATE TRIGGER set_inventories_timestamp
BEFORE UPDATE ON inventa.inventories
FOR EACH ROW
EXECUTE PROCEDURE trigger_inventories_set_timestamp();

COMMIT;
