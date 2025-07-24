import { FormField } from "@/components/FormInput";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormSelectField } from "@/components/FormSelect";
import type { TStoreConfigurationSectionProps } from "@/signup/interfaces";

const booleanOptions = [
  { value: "true", label: "Oui", booleanValue: true },
  { value: "false", label: "Non", booleanValue: false },
];

export function StoreConfigurationSection({
  control,
  register,
  errors,
  categoryOptions,
  hubOptions,
}: TStoreConfigurationSectionProps) {
  return (
    <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 rounded-lg p-4">
      <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
        <FormField
          label="Nombre de produits en catalogue"
          placeholder="Nombre de produits"
          register={{ ...register("numberProduct") }}
          id="numberProduct"
          error={errors.numberProduct}
          required
          type="number"
        />

        <FormSelectField
          required
          label="Hub"
          options={hubOptions}
          name="refIdHub"
          control={control}
          id="refIdHub"
          error={errors.refIdHub}
        />

        <FormSelectField
          required
          label="Catégorie principale"
          options={categoryOptions}
          name="refIdPrincipalCategorie"
          control={control}
          id="refIdPrincipalCategorie"
          error={errors.refIdPrincipalCategorie}
        />

        <FormRadioGroup
          label="Avez vous un site e-commerce ?"
          options={booleanOptions}
          name="hasWebSite"
          control={control}
          id="hasWebSite"
        />

        <FormField
          label="Merci de preciser le lien url de votre site e-commerce"
          placeholder="Entrez le lien de votre site e-commerce"
          register={{ ...register("urlWebSite") }}
          id="urlWebSite"
          error={errors.urlWebSite}
        />

        <FormRadioGroup
          label="Avez vous une boutique physique ?"
          options={booleanOptions}
          name="hasPhysicalStore"
          control={control}
          id="hasPhysicalStore"
          required
          error={errors.hasPhysicalStore}
        />

        <FormRadioGroup
          label="Vendez-vous des produits de marque ?"
          options={booleanOptions}
          name="sellsBrandedProducts"
          control={control}
          id="sellsBrandedProducts"
        />
      </div>
    </div>
  );
}
