export type ValidationType =
  | "default"
  | "ready-to-analyze"
  | "face-validating"
  | "ai-analyzing"
  | "valid"
  | "no-face"
  | "multiple-faces"
  | "image-too-large"
  | "error";


export const validationMessages:Partial<Record<ValidationType, string>> = {
  "no-face": "얼굴이 감지되지 않았습니다. 정면 얼굴 사진을 업로드해 주세요.",
  "multiple-faces": "한 명의 얼굴만 포함된 사진을 업로드해 주세요.",
  "image-too-large": "사진용량이 5MB를 초과했습니다. 용량을 줄여 다시 업로드해 주세요.",
  "error": "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
} 
