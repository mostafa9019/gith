import { Authentication } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  authData: Authentication;
  authenticate: (data: Authentication) => void;
  unauthenticate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authData: {} as Authentication,
      authenticate: (data: Authentication) => set({ authData: data }),
      unauthenticate: () => set({ authData: {} as Authentication }),
    }),
    {
      name: "authentication-storage",
    }
  )
);
