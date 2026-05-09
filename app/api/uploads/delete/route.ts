/**
 * POST /api/uploads/delete
 * 
 * Delete an object from MinIO/S3 storage.
 * 
 * Request body:
 * {
 *   "objectKey": "vehicles/123/example-1234567890.jpg"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Object deleted successfully"
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { deleteObjectFromStorage } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate objectKey
    const objectKey = body.objectKey;
    if (!objectKey || typeof objectKey !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing objectKey" },
        { status: 400 }
      );
    }

    // Basic path validation - must start with known prefixes
    const validPrefixes = ["vehicles/", "documents/", "payments/"];
    const hasValidPrefix = validPrefixes.some((prefix) => objectKey.startsWith(prefix));
    if (!hasValidPrefix) {
      return NextResponse.json(
        { success: false, error: "Invalid objectKey prefix. Must start with: vehicles/, documents/, or payments/" },
        { status: 400 }
      );
    }

    // TODO: Add authentication/authorization check here
    // Example: const session = await getSession();
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // Verify user has permission to delete this object

    // Delete the object
    await deleteObjectFromStorage(objectKey);

    return NextResponse.json({
      success: true,
      message: "Object deleted successfully",
    });
  } catch (error) {
    console.error("[uploads/delete] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete object" },
      { status: 500 }
    );
  }
}
