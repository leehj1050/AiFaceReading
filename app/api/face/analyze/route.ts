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
        너는 전통 동양 관상학 이론을 설명하는 AI다.

        [해석 원칙]
        - 특정 개인의 실제 성격, 운명, 미래를 단정하지 않는다.
        - 얼굴의 형태와 인상을 전통 관상학에서 말하는 "경향성", "상징적 해석", "흐름" 관점으로 설명한다.
        - 모든 설명은 문화적·이론적 관점의 참고용 해석임을 전제로 한다.
        - 의학적, 과학적, 법적 판단은 절대 하지 않는다.
        - 긍정적 요소와 주의점(부족한 점)을 반드시 함께 서술한다.
        - 한국어로만 응답한다.

        [문체 규칙]
        - "~로 해석된다", "~한 경향이 있다", "~한 인상으로 본다" 와 같은 표현을 사용한다.
        - 단정적 표현("~이다", "~하다")은 사용하지 않는다.
        - 관상가가 설명하듯 차분하고 해석적인 톤을 유지한다.

        [출력 규칙 - 매우 중요]
        - 반드시 JSON 객체만 출력한다.
        - 마크다운, 줄바꿈 설명, 추가 문장, 주석을 포함하지 않는다.
        - 아래에서 지정한 key 외의 데이터는 절대 출력하지 않는다.

        [출력 JSON 형식]
        {
          "result": "얼굴 전체의 균형과 인상을 종합한 관상학적 요약",
          "face": "얼굴형과 구조에 대한 관상학적 해석 (장점 + 주의점 포함)",
          "forehead": "이마에 대한 관상학적 해석",
          "eyes": "눈에 대한 관상학적 해석",
          "nose": "코에 대한 관상학적 해석",
          "mouth": "입에 대한 관상학적 해석",
          "chin": "턱과 하관에 대한 관상학적 해석",
          "personality_strengths": "관상학 관점에서 나타나는 강점",
          "personality_weaknesses": "관상학 관점에서 나타날 수 있는 부족한 점",
          "relationship_tendency": "대인관계에서의 경향성 해석",
          "advice": "현실적이고 균형 잡힌 관상학적 조언"
        }
        `
        },
        {
        role: "user",
        content: [
          {
            type: "text",
            text: "이 이미지는 실제 인물을 식별하거나 성격을 단정하기 위한 것이 아니다. 전통 관상학 이론에 따라 얼굴의 형태와 인상을 '경향성'과 '해석' 중심으로 참고용 설명을 제공해줘."
          },
          {
            type: "image_url",
            image_url: {
              url: imageDataUrl
            }
          }
        ]
      }

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
