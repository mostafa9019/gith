import { useQuery } from "@tanstack/react-query"
import Stepper from "@/components/Stepper"
import type { SellerBankingInformation } from "@/signup/interfaces"
import { getBankList } from "@/signup/services"
import { useBankingMutation } from "@/api/mutations/useBankingMutation"
import { BankingInformationSection } from "@/signup/components/bankingInformation/BankingInformationSection"
import { DocumentUploadSection } from "@/signup/components/bankingInformation/DocumentUploadSection"
import { useBankingForm } from "@/signup/hooks/useBankingInformationForm"
import { defaultBankingInfo } from "@/signup/constants"

interface SellerBankingInformationFormProps { 
  initialData?: SellerBankingInformation
}

const STEP_INDEX = 3



export default function SellerBankingInformationForm({ initialData }: SellerBankingInformationFormProps) {
  const bankingData = initialData || defaultBankingInfo

  const bankQuery = useQuery({
    queryKey: ["bank"],
    queryFn: getBankList,
    retry: false,
  })

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    isValid,
  } = useBankingForm({ initialData: bankingData, stepIndex: STEP_INDEX })
    
  const bankingInformationMutation = useBankingMutation({ initialData: bankingData })

  const onSubmit = handleSubmit(
    (data) => {
      bankingInformationMutation.mutate(data)
    },
    (error) => {
      console.error("Form validation errors:", error)
    },
  )

  if (!initialData) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg py-4 sm:px-4 px-0 gap-4 min-h-[400px]">
        <div className="text-center">
          <p className="text-lg text-primary">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <BankingInformationSection
        control={control}
        register={register}
        errors={errors}
        bankOptions={bankQuery.data || []}
      />

      <DocumentUploadSection
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        sellerId={bankingData.id_seller}
      />  

      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper
          handleSaveProgress={onSubmit}
          saveDisabled={!isValid}
          saveLoading={bankingInformationMutation.isPending}
        />
      </div>
    </div>
  )
}

