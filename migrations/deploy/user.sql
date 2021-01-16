-- Deploy inventa_db:user to pg

BEGIN;

-- Update updatedAt function
CREATE OR REPLACE FUNCTION trigger_users_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users table
CREATE SEQUENCE inventa.users_id_seq;
CREATE TABLE inventa.users
(
  id integer NOT NULL DEFAULT nextval('inventa.users_id_seq'::regclass),
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "email" character varying(255) NOT NULL UNIQUE,
  "auth0Id" character NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Trigger update
CREATE TRIGGER set_users_timestamp
BEFORE UPDATE ON inventa.users
FOR EACH ROW
EXECUTE PROCEDURE trigger_users_set_timestamp();

COMMIT;