import { SellerInformation } from "@/signup/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SellerState {
  seller: SellerInformation;
  setSeller: ({}: SellerInformation) => void;
}

export const useSellerStore = create<SellerState>()(
  persist(
    (set) => ({
      seller: {} as SellerInformation,
      setSeller: (seller) => set({ seller }),
    }),
    {
      name: "seller-storage",
    }
  )
);
