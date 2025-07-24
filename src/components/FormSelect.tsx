import { Control, Controller, FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  id: number;
  name: string;
}

interface FormSelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
  name: string;
  control: Control<any>;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  helpText?: string;
  options: Option[];
}

export function FormSelectField({
  id,
  label,
  required = false,
  name,
  control,
  error,
  placeholder = "Sélectionner une option",
  className = "",
  helpText,
  options,
}: FormSelectFieldProps) {
  return (
    <div className={`grid grid-cols-1 ${className} sm:w-1/2 w-full gap-2 `}>
      <label htmlFor={id} className="text-sm font-bold text-primary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <SelectTrigger id={id} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options && options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-options" disabled>
                    Aucune option disponible
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {helpText && <p className="text-xs ml-2 text-gray-500">{helpText}</p>}
      {error && <p className="text-xs ml-2 text-red-500">{error.message}</p>}
    </div>
  );
}
