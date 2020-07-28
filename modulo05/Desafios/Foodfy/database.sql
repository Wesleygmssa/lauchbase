-- exclude atual database and create new db
DROP DATABASE IF EXISTS foodfy5;
CREATE DATABASE foodfy5;

-- recipes
CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
  "image" text NOT NULL,
  "title" text NOT NULL,
  "chef_id" int NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text,
  "created_at" timestamp DEFAULT (now())
);

-- chefs
CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "avatar_url" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

-- reset sequences
ALTER SEQUENCE recipes_id_seq RESTART WITH 1;
ALTER SEQUENCE chefs_id_seq RESTART WITH 1;