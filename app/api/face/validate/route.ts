import { NextResponse } from "next/server";
import {
  RekognitionClient,
  DetectFacesCommand,
} from "@aws-sdk/client-rekognition";

const client = new RekognitionClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, reason: "NO_IMAGE" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    // ✅ 1. 이미지 용량 사전 체크
    if (bytes.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          reason: "IMAGE_TOO_LARGE",
          maxSizeMB: 5,
        },
        { status: 413 } // Payload Too Large
      );
    }

    const command = new DetectFacesCommand({
      Image: { Bytes: bytes },
      Attributes: [], // 기본 얼굴 감지
    });

    const result = await client.send(command);
    const faceCount = result.FaceDetails?.length ?? 0;

    if (faceCount === 0) {
      return NextResponse.json({
        success: false,
        reason: "NO_FACE",
      });
    }

    if (faceCount > 1) {
      return NextResponse.json({
        success: false,
        reason: "MULTIPLE_FACES",
      });
    }

    return NextResponse.json({
      success: true,
      faceCount: 1,
    });

  } catch (err: any) {
    console.error("Rekognition error:", err);

    // ✅ 2. AWS ValidationException 방어 (혹시 사전 체크 못한 경우)
    if (err.name === "ValidationException") {
      return NextResponse.json(
        {
          success: false,
          reason: "IMAGE_TOO_LARGE",
          maxSizeMB: 5,
        },
        { status: 413 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        reason: "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
};
