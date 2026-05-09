/**
 * POST /api/uploads/presign
 * 
 * Generate a presigned upload URL for client-side uploads to MinIO/S3.
 * The client can use this URL to upload files directly without exposing credentials.
 * 
 * Request body:
 * {
 *   "purpose": "vehicle-image" | "customer-document" | "payment-proof",
 *   "ownerId": "vehicle-id-or-user-id-or-booking-code",
 *   "fileName": "example.jpg",
 *   "contentType": "image/jpeg"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "uploadUrl": "https://...",
 *     "objectKey": "vehicles/123/example-1234567890.jpg",
 *     "publicUrl": "https://..."
 *   }
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { createPresignedUploadUrl } from "@/lib/storage";
import type { UploadPurpose } from "@/lib/storage";

// Allowed content types per purpose
const ALLOWED_CONTENT_TYPES: Record<UploadPurpose, string[]> = {
  "vehicle-image": ["image/jpeg", "image/png", "image/webp"],
  "customer-document": ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  "payment-proof": ["image/jpeg", "image/png", "image/webp", "application/pdf"],
};

// Max file sizes per purpose (in bytes)
const MAX_FILE_SIZES: Record<UploadPurpose, number> = {
  "vehicle-image": 5 * 1024 * 1024, // 5MB
  "customer-document": 10 * 1024 * 1024, // 10MB
  "payment-proof": 5 * 1024 * 1024, // 5MB
};

function isValidPurpose(value: string): value is UploadPurpose {
  return ["vehicle-image", "customer-document", "payment-proof"].includes(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate purpose
    const purpose = body.purpose;
    if (!purpose || !isValidPurpose(purpose)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing purpose. Must be: vehicle-image, customer-document, or payment-proof" },
        { status: 400 }
      );
    }

    // Validate ownerId
    const ownerId = body.ownerId;
    if (!ownerId || typeof ownerId !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing ownerId" },
        { status: 400 }
      );
    }

    // Validate fileName
    const fileName = body.fileName;
    if (!fileName || typeof fileName !== "string" || fileName.length > 255) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing fileName (max 255 characters)" },
        { status: 400 }
      );
    }

    // Validate contentType
    const contentType = body.contentType;
    if (!contentType || typeof contentType !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing contentType" },
        { status: 400 }
      );
    }

    const allowedTypes = ALLOWED_CONTENT_TYPES[purpose];
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Content type ${contentType} not allowed for ${purpose}. Allowed: ${allowedTypes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // TODO: Add authentication/authorization check here
    // Example: const session = await getSession();
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // Verify user has permission to upload for this ownerId

    // Generate presigned upload URL
    const result = await createPresignedUploadUrl({
      purpose,
      ownerId,
      fileName,
      contentType,
      maxFileSize: MAX_FILE_SIZES[purpose],
    });

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl: result.uploadUrl,
        objectKey: result.objectKey,
        publicUrl: result.publicUrl,
      },
    });
  } catch (error) {
    console.error("[uploads/presign] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
