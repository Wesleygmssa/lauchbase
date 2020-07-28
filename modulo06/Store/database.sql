-- exclude atual database and create new db
DROP DATABASE IF EXISTS store;
CREATE DATABASE store;

-- products
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int,
  "status" int NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

-- categories
CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

INSERT INTO categories(name) VALUES('Comidas');
INSERT INTO categories(name) VALUES('Eletrônicos');
INSERT INTO categories(name) VALUES('Automóveis');

-- files
CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text,
  "product_id" int
);

-- foreign keys
ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

-- create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- auto updated_at products
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- cascade effect when delete user and products
ALTER TABLE "products"
DROP CONSTRAINT products_user_id_fkey,
ADD CONSTRAINT products_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER TABLE "files"
DROP CONSTRAINT files_product_id_fkey,
ADD CONSTRAINT files_product_id_fkey
FOREIGN KEY ("product_id")
REFERENCES "products" ("id")
ON DELETE CASCADE;

-- reset sequences
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE files_id_seq RESTART WITH 1;
