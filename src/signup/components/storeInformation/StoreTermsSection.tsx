import { Checkbox } from "@/components/ui/checkbox";
import { DocType } from "@/signup/enums";
import type { TStoreTermsSectionProps, CustomFile } from "@/signup/interfaces";
import FileUpload from "@/components/FileUpload";

export function StoreTermsSection({
  watch,
  setValue,
}: TStoreTermsSectionProps) {
  const files = (watch("docs") || []) as CustomFile[];

  return (
    <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id="checkedCguOctopia"
          checked={watch("checkedCguOctopia")}
          onCheckedChange={(checked) => {
            setValue("checkedCguOctopia", checked === true, {
              shouldValidate: true,
            });
          }}
        />
        <label htmlFor="checkedCguOctopia" className="text-xs text-primary">
          En cochant la case vous confirmez avoir lu et accepté les Conditions
          Générales d'utilisation d'Octopia{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id="checkedAcceptRegistration"
          checked={watch("checkedAcceptRegistration")}
          onCheckedChange={(checked) => {
            setValue("checkedAcceptRegistration", checked === true, {
              shouldValidate: true,
            });
          }}
        />
        <label
          htmlFor="checkedAcceptRegistration"
          className="text-xs text-primary"
        >
          En cochant la case vous acceptez de vous inscrire à Marjane Mall{" "}
          <span className="text-red-500">*</span>
          <span className="text-primary underline hover:cursor-pointer">
            Voir ici
          </span>
        </label>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id="checkedCgm"
          checked={watch("checkedCgm")}
          onCheckedChange={(checked) => {
            setValue("checkedCgm", checked === true, {
              shouldValidate: true,
            });
          }}
        />
        <label htmlFor="checkedCgm" className="text-xs text-primary">
          En cochant la case vous confirmez avoir lu et accepté les Conditions
          Générales de Mise à Disposition et la charte des bonnes pratiques de
          Marjane Mall <span className="text-red-500">*</span>{" "}
          <span
            className="text-primary underline hover:cursor-pointer"
            onClick={() => {
              window.open(
                "https://stg0manage0sellers0prod.blob.core.windows.net/files-manage-sellers/CGVMAD.pdf",
                "_blank"
              );
            }}
          >
            Voir ici{" "}
          </span>
        </label>
      </div>
      <FileUpload
        files={files}
        setFiles={setValue}
        docType={DocType.CGU_SIGNED}
        // sellerId={sellerId}
      />
    </div>
  );
}
