import type { UseFormSetValue, UseFormGetValues, FieldErrors } from "react-hook-form"
import FileUpload from "@/components/FileUpload"
import type { SellerBankingInformationFormData } from "@/signup/zod"
import type { CustomFile } from "@/signup/interfaces"
import { DocType } from "@/signup/enums"

interface DocumentUploadSectionProps {
  setValue: UseFormSetValue<SellerBankingInformationFormData>
  getValues: UseFormGetValues<SellerBankingInformationFormData>
  errors: FieldErrors<SellerBankingInformationFormData>
  sellerId?: string
}

export function DocumentUploadSection({ setValue, getValues, errors, sellerId }: DocumentUploadSectionProps) {
  return (
    <div className="flex flex-col items-start justify-center rounded-lg p-4 gap-2">
      <p className="text-xl font-bold text-left text-primary">Document(s) à fournir</p>
      <p className="text-sm text-left text-primary">Merci de télécharger les documents suivants</p>
      <p className="text-sm font-bold text-primary">
        Relevé d'identité bancaire (RIB) <span className="text-red-500">*</span>
      </p>
      <p className="text-xs text-primary w-1/2">Vous recevrez les virements de l'argent de vos ventes sur ce compte</p>

      <FileUpload
        files={(getValues("docs") as CustomFile[]) || []}
        setFiles={setValue}
        docType={DocType.BANKING}
        sellerId={sellerId}
      />

      {errors.docs && <p className="text-xs ml-2 text-red-500">{errors.docs.message}</p>}
    </div>
  )
}
