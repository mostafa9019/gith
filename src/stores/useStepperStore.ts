import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepperState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useStepperStore = create<StepperState>()(
  persist(
    (set) => ({
      currentStep: 1,
      setCurrentStep: (step: number) => set({ currentStep: step }),
    }),
    {
      name: "stepper-storage",
    }
  )
);
