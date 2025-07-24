import { Control, Controller, FieldError } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string; // Change to string, with a value of "true" or "false"
  label: string;
  booleanValue?: boolean; // Optional boolean equivalent
}

interface FormRadioGroupProps {
  id: string;
  label: string;
  required?: boolean;
  name: string;
  control: Control<any>;
  error?: FieldError;
  className?: string;
  helpText?: string;
  options: RadioOption[];
  horizontal?: boolean;
}

export function FormRadioGroup({
  id,
  label,
  required = false,
  name,
  control,
  error,
  className = "",
  helpText,
  options,
  horizontal = false,
}: FormRadioGroupProps) {
  return (
    <div
      className={`flex justify-between flex-row sm:w-1/2 w-full gap-2 ${className}`}
    >
      <label htmlFor={id} className="text-sm font-bold text-primary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={(value) => {
              // Convert string value to boolean if needed
              field.onChange(
                value === "true" ? true : value === "false" ? false : value
              );
            }}
            defaultValue={field.value?.toString()} // Convert boolean to string
            value={field.value?.toString()} // Convert boolean to string
            className="py-2"
          >
            <div
              className={`flex ${
                horizontal ? "flex-row gap-6" : "flex-col gap-2"
              }`}
            >
              {options &&
                options.length > 0 &&
                options.map((option, index) => (
                  <div
                    key={`${id}-${index}`} // Add missing key prop
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${id}-${index}`}
                    />
                    <Label htmlFor={`${id}-${index}`} className="text-primary">
                      {option.label}
                    </Label>
                  </div>
                ))}
            </div>
          </RadioGroup>
        )}
      />
      {helpText && <p className="text-xs ml-2 text-gray-500">{helpText}</p>}
      {error && <p className="text-xs ml-2 text-red-500">{error.message}</p>}
    </div>
  );
}
