import { Button } from "./ui/button";
import { X } from "lucide-react";
import {
  FileToCustomFile,
  handleDownloadFile,
  truncateFilename,
} from "@/lib/utils";
import { CustomFile } from "@/signup/interfaces";
import { UseFormSetValue } from "react-hook-form";
import { DocType } from "@/signup/enums";

interface FileUploadProps {
  files: CustomFile[];
  setFiles: UseFormSetValue<any>;
  docType: DocType;
  sellerId?: string;
}

export default function FileUpload({
  files,
  setFiles,
  docType,
  sellerId,
}: FileUploadProps) {
  const handleFileChange = (newfiles: File[]) => {
    processFiles(newfiles);
  };

  const processFiles = async (uploadedFiles: File[]) => {
    if (uploadedFiles.length > 0) {
      const newFile = await FileToCustomFile(uploadedFiles[0], docType, sellerId || "");
      const currentFiles = files || [];
      setFiles("docs", [...currentFiles, newFile], { shouldValidate: true });
    } else {
      setFiles("docs", [], { shouldValidate: true });
    }
  };
  const handleRemoveFile = (fileToRemove: CustomFile) => {
    const currentFiles = files || [];
    const updatedDocs = currentFiles.filter((file) => file !== fileToRemove);
    setFiles("docs", updatedDocs, { shouldValidate: true });
  };

  const handleDownloadFile_ = (url?: string) => {
    if (url) handleDownloadFile(url);
  };

  return (
    <div className="flex flex-row items-center gap-2 flex-wrap">
      <Button
        variant="outline"
        className="hover:bg-white"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = true;
          input.accept = [".png", ".jpg", ".jpeg", ".pdf"].join(",");
          input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
              handleFileChange(Array.from(target.files));
            }
          };
          input.click();
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary">Ajouter un fichier(s)</span>
          <span className="text-xs text-gray-500">.png, .jpg, .jpeg, .pdf</span>
        </div>
      </Button>

      {files && files.length > 0 &&
        files.map((file, index) => (
          <div key={index} className="flex items-center ">
            <div
              className={`flex px-2 py-1 text-xs h-8 items-center justify-center text-primary ${
                file.path && "hover:cursor-pointer underline"
              }`}
              onClick={() => file.path && handleDownloadFile_(file.path)}
            >
              {truncateFilename(file.name, 12, 8)}
            </div>
            <Button
              variant="outline"
              className="hover:bg-white border-none"
              onClick={() => handleRemoveFile(file)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
    </div>
  );
}
