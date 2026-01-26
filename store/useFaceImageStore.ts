import { create } from "zustand";

type FaceValidation =
  | "default"
  | "ready-to-analyze"
  | "face-validating"
  | "ai-analyzing"
  | "no-face"
  | "multiple-faces"
  | "image-too-large"
  | "valid"
  | "error";

type FaceState = {
  file: File | null;
  previewUrl: string | null;
  validation: FaceValidation;

  setImage: (file: File, previewUrl: string) => void;
  setValidation: (v: FaceValidation) => void;
  resetImage: () => void;
};


export const useFaceImageStore = create<FaceState>((set) => ({
  file: null,
  previewUrl: null,
  validation: "default",

  setImage: (file, previewUrl) =>
    set({ file, previewUrl, validation: "default" }),

  setValidation: (validation) =>
    set({ validation }),

  resetImage: () =>
    set({
      file: null,
      previewUrl: null,
      validation: "default",
  }),
}));
