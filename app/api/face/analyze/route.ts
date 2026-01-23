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

    // 🔥 실제 MIME 타입 사용
    const mimeType = file.type || "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${base64Image}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Vision 지원
      messages: [
        {
          role: "system",
          content: `
            너는 관상학을 설명하는 AI다.
            특정 개인을 단정하거나 식별하지 말고,     
            일반적인 얼굴 특징에 대한 관상학적 해석을 제공하라.
            
            분석할내용:
            - 전체적인 인상을 분석하라.
            - 얼굴형에 대하여 설명하고 분석하라.
            - 이마에 대하여 설명하고 분석하라.
            - 눈에 대하여 설명하고 분석하라.
            - 코에 대하여 설명하고 분석하라.
            - 입에 대하여 설명하고 분석하라.
            - 턱에 대하여 설명하고 분석하라.

            종합적으로 다음 항목에 대하여 서술하라.
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
              text: "이 이미지는 특정 인물을 식별하거나 판단하기 위한 것이 아니다. 일반적인 얼굴 형태와 인상에 대해 관상학 관점에서 참고용 해석을 제공해줘. "
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
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
