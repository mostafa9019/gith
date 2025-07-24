import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormField } from "@/components/FormInput";
import { FormSelectField } from "@/components/FormSelect";
import type { SellerBankingInformationFormData } from "@/signup/zod";

interface BankingInformationSectionProps {
  control: Control<SellerBankingInformationFormData>;
  register: UseFormRegister<SellerBankingInformationFormData>;
  errors: FieldErrors<SellerBankingInformationFormData>;
  bankOptions: Array<{ id: number; name: string }>;
}

export function BankingInformationSection({
  control,
  register,
  errors,
  bankOptions,
}: BankingInformationSectionProps) {
  return (
    <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
      <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
        <p className="text-2xl font-bold text-left text-primary">
          Informations bancaires
        </p>
        <p className="text-xs text-primary">
          Informations nécessaires pour recevoir les règlements de vos ventes
        </p>
      </div>

      <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
        <FormSelectField
          label="Nom de votre banque"
          options={bankOptions}
          name="refIdBank"
          control={control}
          id="refIdBank"
          required
          error={errors.refIdBank}
        />

        <FormField
          label="Titulaire du compte"
          id="nameAccountHolder"
          placeholder="Entrez le nom du titulaire du compte"
          register={{ ...register("nameAccountHolder") }}
          required
          error={errors.nameAccountHolder}
          helpText="Doit être identique à la raison sociale de l'Entreprise. Pour les auto-entrepreneurs, merci de renseigner votre nom et prénom ou le nom commercial de l'Entreprise."
        />

        <FormField
          label="RIB"
          id="rib"
          required
          error={errors.rib}
          placeholder="Entrez votre RIB"
          register={{ ...register("rib") }}
          helpText="Vous trouverez votre RIB sur votre relevé bancaire ou dans votre espace bancaire en ligne."
        />
      </div>
    </div>
  );
}
