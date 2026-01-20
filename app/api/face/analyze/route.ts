import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "이미지가 없습니다." },
        { status: 400 }
      );
    }

    // File → base64 변환
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Vision 지원
      messages: [
        {
          role: "system",
          content: `
            너는 관상 전문가 AI다.
            사진 속 얼굴을 보고 관상 관점에서 다음을 분석하라.

            - 전체적인 인상
            - 성격적 장점
            - 성격적 단점
            - 대인관계 성향
            - 조언 (현실적이고 부드럽게)

            주의사항:
            - 의학적, 법적, 단정적인 판단 금지
            - 재미와 참고용임을 전제로 서술
            - 한국어로 답변
        `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "이 얼굴을 관상 관점에서 분석해줘.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 600,
    });

    const result = response.choices[0].message.content;

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "관상 분석 실패" },
      { status: 500 }
    );
  }
}
