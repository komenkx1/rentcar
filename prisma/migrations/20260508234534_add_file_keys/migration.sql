-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "file_key" TEXT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "proof_key" TEXT;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "image_keys" TEXT[] DEFAULT ARRAY[]::TEXT[];
