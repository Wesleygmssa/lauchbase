-- exclude atual database and create new db
DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

-- recipes
CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "chef_id" int NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text,
  "created_at" timestamp DEFAULT (now())
  "updated_at" timestamp DEFAULT (now())
);

-- files
CREATE TABLE "files" (
	"id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

-- chefs
CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" int REFERENCES "files"("id"),
  "created_at" timestamp DEFAULT (now())
);

-- recipe files
CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int REFERENCES "recipes"("id"),
  "file_id" int REFERENCES "files"("id")
);

-- foreign key
ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs"("id");

-- create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- auto updated_at recipes
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- reset sequences
ALTER SEQUENCE recipes_id_seq RESTART WITH 1;
ALTER SEQUENCE chefs_id_seq RESTART WITH 1;
ALTER SEQUENCE files_id_seq RESTART WITH 1;
ALTER SEQUENCE recipe_files_id_seq RESTART WITH 1;