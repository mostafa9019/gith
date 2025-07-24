import Stepper from "@/components/Stepper";
import type { SellerCommercialInformation } from "../interfaces";
import { useCommercialForm } from "@/signup/hooks/useCommercialForm";
import { useCommercialMutation } from "@/api/mutations/useCommercialMutation";

import { CommercialInformationSection } from "@/signup/components/commercialInformation/CommercialInformationSection";
import { CommercialDocumentSection } from "@/signup/components/commercialInformation/CommercialDocumentSection";
import { ListOption } from "@/interfaces";

interface SellerCommercialInformationFormProps {
  initialData?: SellerCommercialInformation;
  citiesList: ListOption[];
}

const STEP_INDEX = 2;

export default function SellerCommercialInformationForm({
  initialData,
  citiesList,
}: SellerCommercialInformationFormProps) {
  // const { currencyOptions } = useCommercialQueries();

  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    isValid,
    selectedDate,
    setSelectedDate,
  } = useCommercialForm({ initialData, stepIndex: STEP_INDEX });

  const commercialInformationMutation = useCommercialMutation({ initialData });

  const onSubmit = handleSubmit(
    (data) => {
      commercialInformationMutation.mutate(data);
    },
    (error) => {
      console.error("Form validation errors:", error);
    }
  );

  console.log("citiesListQueryaaa", citiesList);

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <CommercialInformationSection
        control={control}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        // currencyOptions={currencyOptions}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        citiesList={citiesList}
      />

      <CommercialDocumentSection
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        sellerId={initialData?.id_seller}
      />

      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper
          handleSaveProgress={onSubmit}
          saveDisabled={!isValid}
          saveLoading={commercialInformationMutation.isPending}
        />
      </div>
    </div>
  );
}
