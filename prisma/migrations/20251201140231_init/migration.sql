-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('buy', 'sell');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "categories" (
    "id_category" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "products" (
    "id_product" VARCHAR(50) NOT NULL,
    "id_category" VARCHAR(255) NOT NULL,
    "SKU" VARCHAR(255) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "session" (
    "id_session" VARCHAR(50) NOT NULL,
    "id_user" VARCHAR(255) NOT NULL,
    "token" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id_session")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id_stock" VARCHAR(50) NOT NULL,
    "id_product" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id_stock")
);

-- CreateTable
CREATE TABLE "transaction_logs" (
    "id_transaction" VARCHAR(50) NOT NULL,
    "id_user" VARCHAR(255) NOT NULL,
    "id_product" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "transaction_type" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "transaction_logs_pkey" PRIMARY KEY ("id_transaction")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR NOT NULL,
    "contact" VARCHAR(50) NOT NULL,
    "image" TEXT,
    "address" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "fk_session_user" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "id_product" FOREIGN KEY ("id_product") REFERENCES "products"("id_product") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction_logs" ADD CONSTRAINT "id_product" FOREIGN KEY ("id_product") REFERENCES "products"("id_product") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction_logs" ADD CONSTRAINT "id_user" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
