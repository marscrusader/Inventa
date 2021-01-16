-- Revert inventa_db:collection from pg

BEGIN;

DROP TABLE inventa.collections;
DROP SEQUENCE inventa.collections_id_seq;

DROP TABLE inventa.categories;
DROP TABLE inventa.status;

COMMIT;
