import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  className?: string;
  helpText?: string;
  initialData?: string;
  showPasswordToggle?: boolean; // New prop to control password toggle visibility
}

export function FormField({
  id,
  label,
  required = false,
  register,
  error,
  type = "text",
  placeholder,
  className = "",
  helpText,
  showPasswordToggle = false, // Default to false
}: FormFieldProps) {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Determine the actual input type
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`grid grid-cols-1 ${className} sm:w-1/2 w-full gap-2`}>
      <label htmlFor={id} className="text-sm font-bold text-primary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={showPasswordToggle ? "pr-10" : ""}
          {...register}
        />

        {/* Password toggle button - only shown if type is password and showPasswordToggle is true */}
        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-1"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {helpText && <p className="text-xs ml-2 text-gray-500">{helpText}</p>}
      {error && <p className="text-xs ml-2 text-red-500">{error.message}</p>}
    </div>
  );
}
