import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  sellerCredentialsFormData,
  SellerCommercialInformationFormData,
  SellerBankingInformationFormData,
  SellerStoreFormData,
} from "@/signup/zod";

type StepFormData =
  | sellerCredentialsFormData
  | SellerCommercialInformationFormData
  | SellerBankingInformationFormData
  | SellerStoreFormData
  | Record<string, unknown>;

interface StepperState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepValidationStates: Record<number, boolean>;
  setStepValidation: (step: number, isValid: boolean) => void;
  canNavigateToStep: (targetStep: number) => boolean;
  stepFormData: Record<number, StepFormData>;
  setStepFormData: (step: number, data: StepFormData) => void;
  getStepFormData: (step: number) => StepFormData | null;
  areAllStepsValid: () => boolean;
}

export const useStepperStore = create<StepperState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      setCurrentStep: (step: number) => set({ currentStep: step }),
      stepValidationStates: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
      setStepValidation: (step: number, isValid: boolean) =>
        set((state) => ({
          stepValidationStates: {
            ...state.stepValidationStates,
            [step]: isValid,
          },
        })),
      canNavigateToStep: (targetStep: number) => {
        const { currentStep, stepValidationStates } = get();

        if (targetStep <= currentStep) {
          return true;
        }

        for (let i = 1; i < targetStep; i++) {
          if (!stepValidationStates[i]) {
            return false;
          }
        }

        return true;
      },
      areAllStepsValid: () => {
        const { stepValidationStates } = get();
        return (
          stepValidationStates[1] &&
          stepValidationStates[2] &&
          stepValidationStates[3] &&
          stepValidationStates[4]
        );
      },
      stepFormData: {},
      setStepFormData: (step: number, data: StepFormData) =>
        set((state) => ({
          stepFormData: {
            ...state.stepFormData,
            [step]: data,
          },
        })),
      getStepFormData: (step: number) => {
        const { stepFormData } = get();
        return stepFormData[step] || null;
      },
    }),
    {
      name: "stepper-storage",
    }
  )
);
