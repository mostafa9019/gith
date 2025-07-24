import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RefreshState {
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
}

export const useRefreshStore = create<RefreshState>()(
  persist(
    (set) => ({
      isRefreshing: false,
      setIsRefreshing: (value: boolean) => set({ isRefreshing: value }),
    }),
    {
      name: "refresh-storage",
    }
  )
);
