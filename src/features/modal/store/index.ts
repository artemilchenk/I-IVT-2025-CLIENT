import { create } from "zustand";
import type { ModalState } from "@/features/modal/types.ts";

export const useModal = create<ModalState>()((set) => ({
  isModal: false,
  setModal: (value) => set(() => ({ isModal: value })),
}));
