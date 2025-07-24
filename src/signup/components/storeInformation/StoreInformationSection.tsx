import { FormField } from "@/components/FormInput";
import type { TStoreInformationSectionProps } from "@/signup/interfaces";

export function StoreInformationSection({
  register,
  errors,
}: TStoreInformationSectionProps) {
  return (
    <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
      <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
        <p className="text-2xl font-bold text-left text-primary">
          Votre boutique Marjanemall
        </p>
      </div>
      <div className="flex flex-col w-full items-start justify-center rounded-lg p-4">
        <FormField
          label="Votre nom de boutique tel qu'il sera affiché sur le site Marjanemall"
          register={{ ...register("name") }}
          id="name"
          required
          error={errors.name}
          placeholder="Entrer l'url de votre site"
          helpText='Ne peut contenir "", "www", "@", ".fr", ".com", ".net" et "discount"'
        />
      </div>
    </div>
  );
}
