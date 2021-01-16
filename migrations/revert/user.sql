-- Revert inventa_db:user from pg

BEGIN;

DROP TABLE inventa.users;
DROP SEQUENCE inventa.users_id_seq;

COMMIT;
