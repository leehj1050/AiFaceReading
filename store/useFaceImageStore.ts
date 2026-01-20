import { create } from "zustand";

type FaceValidation =
  | "idle"
  | "validating"
  | "no-face"
  | "multiple-faces"
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
  validation: "idle",

  setImage: (file, previewUrl) =>
    set({ file, previewUrl, validation: "idle" }),

  setValidation: (validation) =>
    set({ validation }),

  resetImage: () =>
    set({
      file: null,
      previewUrl: null,
      validation: "idle",
  }),
}));
