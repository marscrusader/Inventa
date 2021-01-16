-- Revert inventa_db:inventory from pg

BEGIN;

DROP TABLE inventa.inventories;
DROP SEQUENCE inventa.inventories_id_seq;

COMMIT;
