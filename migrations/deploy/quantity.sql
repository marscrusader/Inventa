-- Deploy inventa_db:quantity to pg

BEGIN;

ALTER TABLE inventa.inventories
ADD COLUMN quantity integer DEFAULT 1;

COMMIT;
