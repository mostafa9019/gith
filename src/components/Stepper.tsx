import { useStepperStore } from "@/stores/useStepperStore";
import { Button } from "./ui/button";
import ActionButton from "./ActionButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepperProps {
  handleSaveProgress: () => void;
  handleFinalize?: () => void;
  saveLoading?: boolean;
  finalizeLoading?: boolean;
  saveDisabled?: boolean;
  finalizeDisabled?: boolean;
}

export default function Stepper({
  handleSaveProgress,
  handleFinalize,
  saveLoading,
  finalizeLoading,
  saveDisabled,
  finalizeDisabled,
}: StepperProps) {
  const { 
    currentStep, 
    setCurrentStep, 
    stepValidationStates, 
    canNavigateToStep 
  } = useStepperStore();
  
  const isLastStep = currentStep === 4;
  const isFirstStep = currentStep === 1;
  const isCurrentStepValid = stepValidationStates[currentStep] || false;
  const canMoveToNext = canNavigateToStep(currentStep + 1);
  
  const handleMoveToNextStep = () => {
    if (!canMoveToNext) {
      return;
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleMoveToPreviousStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="flex sm:flex-row w-full items-center justify-center rounded-lg p-4 gap-2">
          <Button disabled={isFirstStep} onClick={handleMoveToPreviousStep}>
            Page précédente
          </Button>
          <Button 
            onClick={handleMoveToNextStep} 
            disabled={isLastStep || !canMoveToNext}
            title={!isCurrentStepValid ? "Veuillez compléter les champs obligatoires" : ""}
          >
            Page suivante
          </Button>
          <ActionButton
            action={handleSaveProgress}
            loading={saveLoading as boolean}
            label="Sauvegarder"
            disabled={(saveLoading as boolean) || (saveDisabled as boolean)}
          />
          <ActionButton
            action={handleFinalize}
            loading={finalizeLoading as boolean}
            label="Finaliser mon inscription"
            disabled={
              (finalizeLoading as boolean) ||
              (finalizeDisabled as boolean) ||
              !isLastStep 
            }
          />
        </div>
      </div>
      <div className="md:hidden">
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3 flex items-center justify-between z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleMoveToPreviousStep()}
            disabled={isFirstStep}
            className="rounded-full"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {isLastStep ? (
            <div className="flex gap-2">
              <ActionButton
                action={handleSaveProgress}
                loading={saveLoading as boolean}
                label="Sauvegarder"
                disabled={(saveLoading as boolean) || (saveDisabled as boolean)}
              />
              <ActionButton
                action={handleFinalize}
                loading={finalizeLoading as boolean}
                label="Finaliser"
                disabled={
                  (finalizeLoading as boolean) || (finalizeDisabled as boolean)
                }
              />
            </div>
          ) : (
            <ActionButton
              action={handleSaveProgress}
              loading={saveLoading as boolean}
              label="Sauvegarder"
              disabled={(saveLoading as boolean) || (saveDisabled as boolean)}
            />
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Suivant"
            onClick={() => handleMoveToNextStep()}
            disabled={isLastStep || !canMoveToNext}
            title={!isCurrentStepValid ? "Veuillez compléter les champs obligatoires" : ""}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
