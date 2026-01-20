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

export const POST = async (req: Request) =>{
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "이미지가 없습니다." },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

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
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "얼굴 분석 실패" },
      { status: 500 }
    );
  }
}
