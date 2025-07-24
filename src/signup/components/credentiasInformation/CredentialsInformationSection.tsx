import type { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/FormInput";
import { FormSelectField } from "@/components/FormSelect";
import type { sellerCredentialsFormData } from "@/signup/zod";
import type { TCredentialsInformationSectionProps } from "@/signup/interfaces";
import { SellerCrendentialsFormTexts } from "@/signup/constants";

export function CredentialsInformationSection({
  control,
  register,
  errors,
  watch,
  setValue,
  genderOptions,
  functionOptions,
  initialData,
}: TCredentialsInformationSectionProps) {
  return (
    <div className="flex flex-col items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
      <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
        <p className="text-2xl font-bold text-left text-primary">
          {SellerCrendentialsFormTexts.TITLE}
        </p>
        <p className="text-sm text-primary">
          {SellerCrendentialsFormTexts.DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <FormSelectField
          label="État civil"
          options={genderOptions}
          name="refIdGender"
          control={control}
          required
          id="refIdGender"
          error={errors.refIdGender}
        />

        <FormField
          label="Nom"
          placeholder="Entrez votre nom"
          register={{ ...register("firstName") }}
          id="firstName"
          required
          error={errors.firstName}
          initialData={initialData?.firstName}
        />

        <FormField
          label="Prénom"
          placeholder="Entrez votre prénom"
          register={{ ...register("lastName") }}
          id="lastName"
          required
          error={errors.lastName}
        />

        <FormField
          label="E-mail"
          placeholder="Entrez votre e-mail"
          register={{ ...register("email") }}
          id="email"
          required
          error={errors.email}
        />

        <FormSelectField
          label="Fonction occupée au sein de l'entreprise"
          options={functionOptions}
          name="refIdFunctionInCompany"
          control={control}
          id="refIdFunctionInCompany"
          required
          error={errors.refIdFunctionInCompany}
        />

        <PowerCheckbox
          watch={watch}
          setValue={setValue}
          label={SellerCrendentialsFormTexts.TERMS}
          fieldName="hasPower"
        />

        <PowerCheckbox
          watch={watch}
          setValue={setValue}
          label="je suis un directeur"
          fieldName="IsDirector"
        />
        {!watch("IsDirector") && (
          <>
            <FormField
              label="Fonction"
              placeholder="Entrez votre fonction"
              register={{ ...register("refIdFunctionIfNotDirector") }}
              id="refIdFunctionIfNotDirector"
              required={!watch("IsDirector")}
              error={errors.refIdFunctionIfNotDirector}
            />
            <FormField
              label="Mail"
              placeholder="Entrez votre Mail"
              register={{ ...register("emailIfNotDirector") }}
              id="emailIfNotDirector"
              required={!watch("IsDirector")}
              error={errors.emailIfNotDirector}
            />
            <FormField
              label="Téléphone"
              placeholder="Entrez votre téléphone"
              register={{ ...register("PhoneIfNotDirector") }}
              id="PhoneIfNotDirector"
              required={!watch("IsDirector")}
              error={errors.PhoneIfNotDirector}
            />
          </>
        )}
      </div>
    </div>
  );
}

function PowerCheckbox({
  watch,
  setValue,
  label,
  fieldName,
}: {
  watch: UseFormWatch<sellerCredentialsFormData>;
  setValue: UseFormSetValue<sellerCredentialsFormData>;
  label: string;
  fieldName: "IsDirector" | "hasPower";
}) {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Checkbox
        id={fieldName}
        checked={watch(fieldName)}
        onCheckedChange={(checked) => {
          setValue(fieldName, checked === true, {
            shouldValidate: true,
          });
        }}
      />
      <label htmlFor={fieldName} className="text-xs text-primary">
        {label}
      </label>
    </div>
  );
}
