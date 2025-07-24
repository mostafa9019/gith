interface UseStepNavigationProps {
  currentStep: number;
  onChange?: (step: number) => void;
  stepValidationStates?: Record<number, boolean>;
}

export type StepStatus = 'valid' | 'invalid' | 'active' | null;

export const useStepNavigation = ({
  currentStep,
  onChange,
  stepValidationStates = {},
}: UseStepNavigationProps) => {
  const isStepValid = (stepNumber: number): boolean => {
    return stepValidationStates[stepNumber] || false;
  };

  const isStepActive = (stepNumber: number): boolean => {
    return currentStep === stepNumber;
  };

  const areAllPreviousStepsValid = (targetStep: number): boolean => {
    for (let i = 1; i < targetStep; i++) {
      if (!isStepValid(i)) {
        return false;
      }
    }
    return true;
  };

  const canNavigateToStep = (targetStep: number): boolean => {
    if (!onChange) return false;

    if (targetStep <= currentStep) {
      return true;
    }

    return areAllPreviousStepsValid(targetStep);
  };

  const handleStepClick = (stepNumber: number): void => {
    if (!onChange) return;

    if (canNavigateToStep(stepNumber)) {
      onChange(stepNumber);
    }
  };

  const getStepClasses = (stepNumber: number): string => {
    const canNavigate = canNavigateToStep(stepNumber);

    if (!onChange) {
      return "";
    }

    if (canNavigate) {
      return "cursor-pointer hover:opacity-90";
    }

    return "cursor-not-allowed opacity-60";
  };

  const getStepStatus = (stepNumber: number): StepStatus => {
    const isValid = isStepValid(stepNumber);
    const isActive = isStepActive(stepNumber);

    if (isValid && !isActive) {
      return 'valid';
    }

    if (!isValid && isActive) {
      return 'invalid';
    }

    return null;
  };

  return {
    isStepValid,
    isStepActive,
    areAllPreviousStepsValid,
    canNavigateToStep,
    handleStepClick,
    getStepClasses,
    getStepStatus,
  };
}; 