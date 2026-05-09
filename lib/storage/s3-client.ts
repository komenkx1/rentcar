/**
 * S3 client singleton for MinIO/S3-compatible object storage.
 * Configured from environment variables.
 * 
 * IMPORTANT: This module must only be imported in server-side code.
 * Never expose S3_ACCESS_KEY_ID or S3_SECRET_ACCESS_KEY to the client.
 */

import { S3Client } from "@aws-sdk/client-s3";

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function createS3Client(): S3Client {
  const endpoint = getRequiredEnv("S3_ENDPOINT");
  const region = process.env.S3_REGION || "us-east-1";
  const accessKeyId = getRequiredEnv("S3_ACCESS_KEY_ID");
  const secretAccessKey = getRequiredEnv("S3_SECRET_ACCESS_KEY");
  const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";

  return new S3Client({
    region,
    endpoint,
    forcePathStyle,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

// Singleton instance
let s3ClientInstance: S3Client | null = null;

export function getS3Client(): S3Client {
  if (!s3ClientInstance) {
    s3ClientInstance = createS3Client();
  }
  return s3ClientInstance;
}

// Export bucket name for convenience
export function getS3Bucket(): string {
  return getRequiredEnv("S3_BUCKET");
}

// Export public base URL for reading files from browser
export function getS3PublicBaseUrl(): string {
  return getRequiredEnv("S3_PUBLIC_BASE_URL");
}
