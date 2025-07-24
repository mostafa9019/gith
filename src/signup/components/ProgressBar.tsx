import { cn } from "@/lib/utils";
import { TProgressBarProps } from "@/signup/interfaces";
import { useStepNavigation } from "@/signup/hooks";

export function ProgressBar({
  steps,
  currentStep,
  onChange,
  stepValidationStates = {},
  className,
}: TProgressBarProps) {
  const { handleStepClick, getStepClasses, getStepStatus } = useStepNavigation({
    currentStep,
    onChange,
    stepValidationStates,
  });

  const renderStatusIndicator = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    switch (status) {
      case 'valid':
        return <span className="text-xs">✓</span>;
      case 'invalid':
        return <span className="text-xs text-red-200">!</span>;
      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full flex flex-col sm:flex-row gap-2", className)}>
      {steps.map((step) => {
        const stepClasses = getStepClasses(step.number);
        const statusIndicator = renderStatusIndicator(step.number);

        return (
          <div
            key={step.number}
            onClick={() => handleStepClick(step.number)}
            className={cn(
              "flex-1 px-4 py-3 rounded-md text-sm font-medium transition-colors relative bg-primary text-white",
              stepClasses
            )}
          >
            <span className="flex items-center gap-2">
              {step.number} - {step.title}
              {statusIndicator}
            </span>
          </div>
        );
      })}
    </div>
  );
}
