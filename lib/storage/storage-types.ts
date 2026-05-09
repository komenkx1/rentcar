/**
 * Storage types for MinIO/S3-compatible object storage.
 * Defines upload purposes, parameters, and return types.
 */

export type UploadPurpose = "vehicle-image" | "customer-document" | "payment-proof";

export interface UploadParams {
  purpose: UploadPurpose;
  ownerId: string; // vehicleId, userId, or bookingCode
  fileName: string;
  contentType: string;
  maxFileSize?: number; // in bytes, default 5MB
}

export interface UploadResult {
  uploadUrl: string;
  objectKey: string;
  publicUrl: string;
}

export interface UploadBufferParams {
  objectKey: string;
  buffer: Buffer;
  contentType: string;
}

export interface UploadBufferResult {
  objectKey: string;
  publicUrl: string;
}

export interface PresignedDownloadParams {
  objectKey: string;
  expiresIn?: number; // seconds, default 3600 (1 hour)
}
