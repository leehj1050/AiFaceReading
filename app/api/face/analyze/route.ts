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
          너는 관상학적 해석을 제공하는 AI다.

          규칙:
          - 특정 개인을 단정하거나 식별하지 말 것
          - 얼굴 특징에 대한 일반적이고 참고용 관상 해석만 제공할 것
          - 의학적, 법적, 과학적 판단 금지
          - 관상학적·참고용임을 전제로 서술
          - 한국어로만 응답할 것

          ⚠️ 출력 형식 규칙 (중요):
          - 반드시 JSON 객체만 출력하라
          - 마크다운, 설명 문장, 주석, 불필요한 텍스트를 포함하지 말라
          - 아래에서 지정한 key 외의 값은 출력하지 말라

          출력 JSON 형식:
          {
            "result": "전체적인 인상과 관상을 종합한 요약",
            "face": "얼굴형에 대한 관상학적 설명과 해석",
            "forehead": "이마에 대한 관상학적 설명과 해석",
            "eyes": "눈에 대한 관상학적 설명과 해석",
            "nose": "코에 대한 관상학적 설명과 해석",
            "mouth": "입에 대한 관상학적 설명과 해석",
            "chin": "턱에 대한 관상학적 설명과 해석",
            "personality_strengths": "관상학 관점에서 본 성격적 장점",
            "personality_weaknesses": "관상학 관점에서 본 성격적 단점",
            "relationship_tendency": "대인관계 및 사회적 관계 성향",
            "advice": "현실적이고 부드러운 조언"
          }
                      
        `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "이 이미지는 특정 인물을 식별하거나 판단하기 위한 것이 아니다. 일반적인 얼굴 형태와 인상에 대해 관상학 관점에서 참고용 해석을 제공해줘."
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
