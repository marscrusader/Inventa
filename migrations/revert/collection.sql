-- Revert inventa_db:collection from pg

BEGIN;

DROP TABLE inventa.categories;
DROP TABLE inventa.status;
DROP TABLE inventa.collections;
DROP SEQUENCE inventa.collections_id_seq;

COMMIT;
