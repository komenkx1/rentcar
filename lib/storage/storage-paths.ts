/**
 * Storage path helpers for consistent object key generation.
 * All object keys follow the pattern: {prefix}/{ownerId}/{safeFileName}
 */

import type { UploadPurpose } from "./storage-types";

/**
 * Sanitize filename for safe storage.
 * Removes special characters, replaces spaces with hyphens, adds timestamp.
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName || fileName.trim() === "") {
    throw new Error("Filename cannot be empty");
  }

  const timestamp = Date.now();
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? parts.pop()!.toLowerCase() : "";
  const baseName = fileName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase()
    .substring(0, 50); // Limit length

  const safeBaseName = baseName || "file";
  const safeExtension = extension ? `.${extension}` : "";

  return `${safeBaseName}-${timestamp}${safeExtension}`;
}

/**
 * Sanitize ownerId to prevent path traversal attacks.
 * Removes ".." sequences and replaces slashes with underscores.
 */
function sanitizeOwnerId(ownerId: string): string {
  return ownerId.replace(/\.\./g, "").replace(/[\/\\]/g, "_");
}

/**
 * Get object key for vehicle images.
 * Pattern: vehicles/{vehicleId}/{safeFileName}
 */
export function getVehicleImageObjectKey(vehicleId: string, fileName: string): string {
  const safeOwnerId = sanitizeOwnerId(vehicleId);
  const safeName = sanitizeFileName(fileName);
  return `vehicles/${safeOwnerId}/${safeName}`;
}

/**
 * Get object key for customer documents (KTP, SIM, etc).
 * Pattern: documents/{userId}/{safeFileName}
 */
export function getCustomerDocumentObjectKey(userId: string, fileName: string): string {
  const safeOwnerId = sanitizeOwnerId(userId);
  const safeName = sanitizeFileName(fileName);
  return `documents/${safeOwnerId}/${safeName}`;
}

/**
 * Get object key for payment proof uploads.
 * Pattern: payments/{bookingCode}/{safeFileName}
 */
export function getPaymentProofObjectKey(bookingCode: string, fileName: string): string {
  const safeOwnerId = sanitizeOwnerId(bookingCode);
  const safeName = sanitizeFileName(fileName);
  return `payments/${safeOwnerId}/${safeName}`;
}

/**
 * Get object key based on upload purpose.
 */
export function getObjectKeyByPurpose(
  purpose: UploadPurpose,
  ownerId: string,
  fileName: string
): string {
  switch (purpose) {
    case "vehicle-image":
      return getVehicleImageObjectKey(ownerId, fileName);
    case "customer-document":
      return getCustomerDocumentObjectKey(ownerId, fileName);
    case "payment-proof":
      return getPaymentProofObjectKey(ownerId, fileName);
  }
}
