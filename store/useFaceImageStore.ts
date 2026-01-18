import { create } from "zustand";

type FaceState = {
  previewUrl: string | null;
  file: File | null;

  setImage: (file: File, previewUrl: string) => void;
  resetImage: () => void;
};

export const useFaceImageStore = create<FaceState>((set) => ({
  previewUrl: null,
  file: null,

  setImage: (file, previewUrl) =>
    set({
      file,
      previewUrl,
    }),

  resetImage: () =>
    set({
      file: null,
      previewUrl: null,
    }),
}));
