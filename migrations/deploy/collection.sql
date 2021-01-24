-- Deploy inventa_db:collection to pg

BEGIN;

-- Update updated_at function
CREATE OR REPLACE FUNCTION trigger_collections_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updated_at" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Collections table
CREATE SEQUENCE inventa.collections_id_seq;
CREATE TABLE inventa.collections
(
  id integer NOT NULL DEFAULT nextval('inventa.collections_id_seq'::regclass),
  "name" text NOT NULL,
  "userId" integer NOT NULL,
  "s3Id" text,
  "s3ThumbnailId" text,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT collections_pkey PRIMARY KEY (id),
  CONSTRAINT "collections_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES inventa.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Trigger update
CREATE TRIGGER set_collections_timestamp
BEFORE UPDATE ON inventa.collections
FOR EACH ROW
EXECUTE PROCEDURE trigger_collections_set_timestamp();

-- Categories table
CREATE TABLE inventa.categories
(
  "name" text NOT NULL,
  "collectionId" integer NOT NULL,
  CONSTRAINT categories_pkey PRIMARY KEY ("name"),
  CONSTRAINT "categories_collectionId_fkey" FOREIGN KEY ("collectionId")
        REFERENCES inventa.collections (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Status table
CREATE TABLE inventa.status
(
  "name" text NOT NULL,
  "collectionId" integer NOT NULL,
  CONSTRAINT status_pkey PRIMARY KEY ("name"),
  CONSTRAINT "status_collectionId_fkey" FOREIGN KEY ("collectionId")
        REFERENCES inventa.collections (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

COMMIT;
