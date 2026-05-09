-- CreateEnum
CREATE TYPE "Role" AS ENUM ('customer', 'admin', 'owner');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('sedan', 'suv', 'mpv', 'pickup');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('manual', 'automatic');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('bensin', 'diesel', 'hybrid');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('available', 'rented', 'service', 'blocked');

-- CreateEnum
CREATE TYPE "RentalType" AS ENUM ('self_drive', 'with_driver');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'approved', 'active', 'completed', 'cancelled', 'rejected');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('ktp', 'sim', 'bukti_transfer');

-- CreateEnum
CREATE TYPE "DocumentSource" AS ENUM ('customer_upload', 'admin_capture');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'confirmed', 'rejected');

-- CreateEnum
CREATE TYPE "CostType" AS ENUM ('bbm', 'asuransi', 'pajak', 'lainnya');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'customer',
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price_self_drive_per_day" INTEGER NOT NULL,
    "price_with_driver_per_day" INTEGER NOT NULL DEFAULT 0,
    "has_self_drive_option" BOOLEAN NOT NULL DEFAULT true,
    "has_driver_option" BOOLEAN NOT NULL DEFAULT false,
    "status" "VehicleStatus" NOT NULL DEFAULT 'available',
    "image_urls" TEXT[],
    "description" TEXT,
    "plate_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "booking_code" TEXT NOT NULL,
    "user_id" TEXT,
    "vehicle_id" INTEGER NOT NULL,
    "guest_name" TEXT,
    "guest_phone" TEXT,
    "guest_email" TEXT,
    "rental_type" "RentalType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "pickup_location" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "rejection_reason" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "type" "DocumentType" NOT NULL,
    "source" "DocumentSource" NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_at" TIMESTAMP(3),
    "verified_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL DEFAULT 'bank_transfer',
    "bank_account" TEXT,
    "proof_url" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "confirmed_at" TIMESTAMP(3),
    "confirmed_by" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_service_logs" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "service_type" TEXT NOT NULL,
    "description" TEXT,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "service_date" TIMESTAMP(3) NOT NULL,
    "odometer_km" INTEGER,
    "next_service_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicle_service_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operational_costs" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER,
    "cost_type" "CostType" NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operational_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_revenue_summary" (
    "id" SERIAL NOT NULL,
    "summary_date" TIMESTAMP(3) NOT NULL,
    "total_revenue" INTEGER NOT NULL DEFAULT 0,
    "total_bookings" INTEGER NOT NULL DEFAULT 0,
    "active_vehicles" INTEGER NOT NULL DEFAULT 0,
    "idle_vehicles" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_revenue_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_number_key" ON "vehicles"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_booking_code_key" ON "bookings"("booking_code");

-- CreateIndex
CREATE INDEX "bookings_start_date_idx" ON "bookings"("start_date");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_vehicle_id_start_date_end_date_idx" ON "bookings"("vehicle_id", "start_date", "end_date");

-- CreateIndex
CREATE INDEX "payments_confirmed_at_idx" ON "payments"("confirmed_at");

-- CreateIndex
CREATE UNIQUE INDEX "daily_revenue_summary_summary_date_key" ON "daily_revenue_summary"("summary_date");

-- CreateIndex
CREATE UNIQUE INDEX "app_settings_key_key" ON "app_settings"("key");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_confirmed_by_fkey" FOREIGN KEY ("confirmed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_service_logs" ADD CONSTRAINT "vehicle_service_logs_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operational_costs" ADD CONSTRAINT "operational_costs_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
