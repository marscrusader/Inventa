-- Revert inventa_db:quantity from pg

BEGIN;

ALTER TABLE inventa.inventories
DROP COLUMN quantity;

COMMIT;
