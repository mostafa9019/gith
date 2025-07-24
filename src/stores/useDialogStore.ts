import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DialogState {
  open: boolean;
  setOpen: (value: boolean) => void;
  type: string;
  setType: (value: string) => void;
}

export const useDialogStore = create<DialogState>()(
  persist(
    (set) => ({
      open: false,
      setOpen: (value: boolean) => set({ open: value }),
      type: "",
      setType: (value: string) => set({ type: value }),
    }),
    {
      name: "dialog-storage",
    }
  )
);
