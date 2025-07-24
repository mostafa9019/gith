import type { UseFormSetValue, UseFormGetValues, FieldErrors } from "react-hook-form"
import FileUpload from "@/components/FileUpload"
import type { SellerCommercialInformationFormData } from "@/signup/zod"
import type { CustomFile } from "@/signup/interfaces"
import { DocType } from "@/signup/enums"

interface CommercialDocumentSectionProps {
  setValue: UseFormSetValue<SellerCommercialInformationFormData>
  getValues: UseFormGetValues<SellerCommercialInformationFormData>
  errors: FieldErrors<SellerCommercialInformationFormData>
  sellerId?: string
}

export function CommercialDocumentSection({ 
  setValue, 
  getValues, 
  errors, 
  sellerId 
}: CommercialDocumentSectionProps) {
  return (
    <div className="flex flex-col items-start justify-center rounded-lg p-4 gap-2">
      <p className="text-xl font-bold text-left text-primary">
        Document(s) à fournir
      </p>
      <p className="text-sm text-left text-primary">
        Merci de télécharger les documents suivants
      </p>
      <p className="text-sm font-bold text-primary">
        Document officiel justifiant l'existence de l'entreprise et daté de
        moins de 3 mois <span className="text-red-500">*</span>
      </p>
      <p className="text-xs text-primary w-1/2">
        Modèle 3 du registre de commerce de moins de 3 moins
      </p>

      <FileUpload
        files={(getValues("docs") as CustomFile[]) || []}
        setFiles={setValue}
        docType={DocType.COMMERCIAL}
        sellerId={sellerId}
      />

      {errors.docs && (
        <p className="text-xs ml-2 text-red-500">{errors.docs.message}</p>
      )}
    </div>
  )
} 