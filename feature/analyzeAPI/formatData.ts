
export interface FaceAnalysisResult  {
  result: string;
  face: string;
  forehead: string;
  eyes: string;
  nose: string;
  mouth: string;
  chin: string;
  personality_strengths: string;
  personality_weaknesses: string;
  relationship_tendency: string;
  advice: string;
};

const FACE_ANALYZE_KEYS = [
  { key: "result", label: "관상 요약" },
  { key: "face", label: "얼굴형" },
  { key: "forehead", label: "이마" },
  { key: "eyes", label: "눈" },
  { key: "nose", label: "코" },
  { key: "mouth", label: "입" },
  { key: "chin", label: "턱" },
] as const;

const ADVANCED_ANALYZE_KEYS = [
  { key: "personality_strengths", label: "성격적 장점" },
  { key: "personality_weaknesses", label: "성격적 단점" },
  { key: "relationship_tendency", label: "대인관계 성향" },
  { key: "advice", label: "조언" },
] as const;

export const buildAnalyzeData = (raw: FaceAnalysisResult) => {
  return {
    faceAnalyze: FACE_ANALYZE_KEYS.map(({ key, label }) => ({
      key,
      label,
      data: raw[key],
    })),
    analyzeAdvance: ADVANCED_ANALYZE_KEYS.map(({ key, label }) => ({
      key,
      label,
      data: raw[key],
    })),
  };
};
