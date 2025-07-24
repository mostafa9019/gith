import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
}
interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onChange?: (step: number) => void;
  className?: string;
}

export function ProgressBar({
  steps,
  currentStep,
  onChange,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn("w-full flex flex-col sm:flex-row gap-2", className)}>
      {steps.map((step, _index) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;

        return (
          <div
            key={step.number}
            onClick={() => onChange && onChange(step.number)}
            className={cn(
              "flex-1 px-4 py-3 rounded-md text-sm font-medium transition-colors",
              isActive || isCompleted
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500",
              onChange && "cursor-pointer hover:opacity-90"
            )}
          >
            <span className="flex items-center gap-2">
              {step.number} - {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
