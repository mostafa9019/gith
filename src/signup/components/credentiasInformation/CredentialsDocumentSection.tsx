import FileUpload from "@/components/FileUpload";
import type {
  CredentialsDocumentSectionProps,
  CustomFile,
} from "@/signup/interfaces";
import { DocType } from "@/signup/enums";
import { SellerCrendentialsFormTexts } from "@/signup/constants";

export function CredentialsDocumentSection({
  setValue,
  getValues,
  errors,
  sellerId,
}: CredentialsDocumentSectionProps) {
  return (
    <div className="flex flex-col items-start justify-center rounded-lg p-4 gap-2">
      <p className="text-xl font-bold text-left text-primary">
        Document(s) à fournir !!
      </p>
      <p className="text-sm text-left text-primary">
        Merci de télécharger les documents suivants
      </p>
      <p className="text-sm font-bold text-primary">
        Justificatif d'identité <span className="text-red-500">*</span>
      </p>
      <p className="text-xs text-primary w-1/2">
        {SellerCrendentialsFormTexts.ID_TERMS}
      </p>

      <FileUpload
        files={(getValues("docs") as CustomFile[]) || []}
        setFiles={setValue}
        docType={DocType.CRENDENTIAL}
        sellerId={sellerId}
      />

      {errors.docs && (
        <p className="text-xs ml-2 text-red-500">{errors.docs.message}</p>
      )}
    </div>
  );
}
