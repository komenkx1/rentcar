/**
 * Object storage operations for MinIO/S3-compatible storage.
 * Provides server-side functions for upload, delete, and presigned URLs.
 * 
 * IMPORTANT: Only use these functions in server-side code (server actions, API routes).
 */

import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client, getS3Bucket, getS3PublicBaseUrl } from "./s3-client";
import { getObjectKeyByPurpose } from "./storage-paths";
import type {
  UploadParams,
  UploadResult,
  UploadBufferParams,
  UploadBufferResult,
  PresignedDownloadParams,
} from "./storage-types";

/**
 * Get public URL for an object key.
 * Uses S3_PUBLIC_BASE_URL for browser-accessible URLs.
 */
export function getPublicObjectUrl(objectKey: string): string {
  const baseUrl = getS3PublicBaseUrl();
  // Remove trailing slash from base URL
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  // Remove leading slash from object key
  const cleanKey = objectKey.startsWith("/") ? objectKey.slice(1) : objectKey;
  return `${cleanBase}/${cleanKey}`;
}

/**
 * Upload a buffer to object storage.
 * Used for server-side uploads (e.g., from server actions or API routes).
 */
export async function uploadBufferToObjectStorage(
  params: UploadBufferParams
): Promise<UploadBufferResult> {
  const { objectKey, buffer, contentType } = params;
  const client = getS3Client();
  const bucket = getS3Bucket();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return {
    objectKey,
    publicUrl: getPublicObjectUrl(objectKey),
  };
}

/**
 * Delete an object from storage.
 */
export async function deleteObjectFromStorage(objectKey: string): Promise<void> {
  const client = getS3Client();
  const bucket = getS3Bucket();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    })
  );
}

/**
 * Create a presigned upload URL for client-side uploads.
 * The client can use this URL to upload directly to S3/MinIO.
 * 
 * @returns Upload URL, object key, and public URL for the uploaded file.
 */
export async function createPresignedUploadUrl(
  params: UploadParams
): Promise<UploadResult> {
  const { purpose, ownerId, fileName, contentType } = params;
  const client = getS3Client();
  const bucket = getS3Bucket();

  // Generate object key based on purpose
  const objectKey = getObjectKeyByPurpose(purpose, ownerId, fileName);

  // Create presigned PUT URL
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    ContentType: contentType,
    // Note: ContentLength constraint is not supported in presigned URLs
    // Validation should be done on the client side
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: 300, // 5 minutes
  });

  return {
    uploadUrl,
    objectKey,
    publicUrl: getPublicObjectUrl(objectKey),
  };
}

/**
 * Create a presigned download URL for private files.
 * Useful for documents and payment proofs that should not be publicly accessible.
 */
export async function createPresignedDownloadUrl(
  params: PresignedDownloadParams
): Promise<string> {
  const { objectKey, expiresIn = 3600 } = params;
  const client = getS3Client();
  const bucket = getS3Bucket();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: objectKey,
  });

  return getSignedUrl(client, command, { expiresIn });
}
