/**
 * Storage module entry point.
 * Re-exports all storage utilities for easy importing.
 */

// Types
export type {
  UploadPurpose,
  UploadParams,
  UploadResult,
  UploadBufferParams,
  UploadBufferResult,
  PresignedDownloadParams,
} from "./storage-types";

// S3 Client (server-side only)
export { getS3Client, getS3Bucket, getS3PublicBaseUrl } from "./s3-client";

// Path helpers
export {
  sanitizeFileName,
  getVehicleImageObjectKey,
  getCustomerDocumentObjectKey,
  getPaymentProofObjectKey,
  getObjectKeyByPurpose,
} from "./storage-paths";

// Storage operations (server-side only)
export {
  getPublicObjectUrl,
  uploadBufferToObjectStorage,
  deleteObjectFromStorage,
  createPresignedUploadUrl,
  createPresignedDownloadUrl,
} from "./object-storage";
