import { Checkbox } from "@/components/ui/checkbox";
import DateSelect from "@/components/DateSelect";
import { FormField } from "@/components/FormInput";
import { FormSelectField } from "@/components/FormSelect";
import { TCommercialInformationSectionProps } from "@/signup/interfaces";

export function CommercialInformationSection({
  control,
  register,
  errors,
  watch,
  setValue,
  // currencyOptions,
  selectedDate,
  setSelectedDate,
  citiesList,
}: TCommercialInformationSectionProps) {
  return (
    <>
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            Informations commerciales de l'entreprise
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4">
          <FormField
            label="Raison sociale"
            required
            placeholder="Entrez votre raison sociale"
            register={{ ...register("socialRaison") }}
            id="socialRaison"
            error={errors.socialRaison}
            helpText="Doit être indentique à la raison sociale figurant sur le document d'enregistrement de l'entreprise"
          />
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            Adresse du siege social
          </p>
          <p className="text-xs text-primary">
            Doit être indentique à la raison sociale figurant sur le document
            d'enregistrement de l'entreprise
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <div className="flex flex-row items-center justify-between sm:w-1/2 w-full gap-4">
            <FormSelectField
              className="w-full"
              label="Ville"
              required
              options={citiesList}
              name="refIdCitySiege"
              control={control}
              id="refIdCitySiege"
              error={errors.refIdCitySiege}
            />
            <FormField
              label="Code postal"
              required
              placeholder="Entrez votre code postal"
              register={{ ...register("codePostalSiege") }}
              id="codePostalSiege"
              error={errors.codePostalSiege}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <div className="grid grid-cols-1 w-full gap-2">
            <label htmlFor="email" className="text-sm font-bold text-primary">
              Forme juridique de l'entreprise{" "}
            </label>
            <div className="flex items-center space-x-2 px-2 py-1">
              <Checkbox
                id="isSelfEmployed"
                checked={watch("isSelfEmployed")}
                onCheckedChange={(checked) => {
                  setValue("isSelfEmployed", checked === true, {
                    shouldValidate: true,
                  });
                }}
              />
              <label htmlFor="terms" className="text-xs text-primary">
                Auto-entrepreneur
              </label>
            </div>
          </div>

          <FormField
            label="Numéro ICE de l'entreprise"
            placeholder="Entrez votre numéro ICE"
            register={{ ...register("ice") }}
            id="ice"
            required
            error={errors.ice}
          />

          <FormField
            label="RC de l'entreprise"
            placeholder="Entrez votre RC"
            register={{ ...register("rc") }}
            id="rc"
            required
            error={errors.rc}
          />

          <FormField
            label="Nom du représentant fiscal"
            placeholder="Entrez le nom du représentant fiscal"
            register={{ ...register("nameRepresentantFiscal") }}
            id="nameRepresentantFiscal"
          />

          <FormField
            label="Adresse du représentant fiscal"
            placeholder="Entrez l'adresse du représentant fiscal"
            register={{ ...register("adressRepresentantFiscal") }}
            id="adressRepresentantFiscal"
          />

          <div className="flex flex-row items-center justify-between sm:w-1/2 w-full gap-4">
            <FormField
              label="Capital social"
              type="number"
              className="w-full"
              placeholder="Entrez le capital social"
              register={{ ...register("capital") }}
              id="capital"
              required
              error={errors.capital}
            />
            {/* <FormSelectField
              className="w-full"
              label="Concevoir"
              required
              options={currencyOptions}
              name="refIdCurrency"
              control={control}
              id="refIdCurrency"
              error={errors.refIdCurrency}
            /> */}
          </div>

          <div className="grid grid-cols-1 w-full sm:w-1/2 gap-2">
            <DateSelect
              label="Date de création de l'entreprise"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <p className="text-xs text-primary">
              Doit être indentique à la raison sociale figurant sur le document
              d'enregistrement de l'entreprise
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
