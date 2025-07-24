import Stepper from "@/components/Stepper"
import type { SellerCredentials } from "@/signup/interfaces"
import { useCredentialsForm } from "@/signup/hooks/useCredentialsForm"      
import { useCredentialsMutation } from "@/api/mutations/useCredentialsMutation"
import { useCredentialsQueries } from "@/api/queries/useCredentialsQueries"
import { CredentialsInformationSection } from "@/signup/components/credentiasInformation/CredentialsInformationSection"
import { CredentialsDocumentSection } from "@/signup/components/credentiasInformation/CredentialsDocumentSection"

interface SellerCredentialsFormProps {
  initialData?: SellerCredentials
}

const STEP_INDEX = 1

export default function SellerCredentialsForm({ initialData }: SellerCredentialsFormProps) {
  const { genderOptions, functionOptions } = useCredentialsQueries()

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    watch,
    handleSubmit,
    control,
    isValid,
  } = useCredentialsForm({ initialData, stepIndex: STEP_INDEX })

  const credentialsMutation = useCredentialsMutation({ initialData })

  const onSubmit = handleSubmit(
    (data) => {
      credentialsMutation.mutate(data)
    },
    (error) => {
      console.error(error);
    },
  )

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <CredentialsInformationSection
        control={control}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        genderOptions={genderOptions}
        functionOptions={functionOptions}
        initialData={initialData}
      />

      <CredentialsDocumentSection
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        sellerId={initialData?.id_seller}
      />

      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper handleSaveProgress={onSubmit} saveLoading={credentialsMutation.isPending} saveDisabled={!isValid} />
      </div>
    </div>
  )
}
