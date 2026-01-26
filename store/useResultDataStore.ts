import { create } from "zustand";

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

type FaceAnalysisStore = {
  analysis: FaceAnalysisResult | null;
  setAnalysis: (data: FaceAnalysisResult) => void;
  resetAnalysis: () => void;
};

export const useFaceAnalysisStore = create<FaceAnalysisStore>((set) => ({
  analysis: null,

  setAnalysis: (data) =>
    set({
      analysis: data,
    }),

  resetAnalysis: () =>
    set({
      analysis: null,
    }),
}));
