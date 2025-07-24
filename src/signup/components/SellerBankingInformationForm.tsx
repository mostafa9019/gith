import FileUpload from "@/components/FileUpload";
import { useEffect } from "react";
import { FormField } from "@/components/FormInput";
import { FormSelectField } from "@/components/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SellerBankingInformationFormData,
  SellerBankingInformationSchema,
} from "../zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomFile, SellerBankingInformation } from "../interfaces";
import Stepper from "@/components/Stepper";
import { toast } from "@/hooks/use-toast";
import { ErrorResponse, ServerResponse } from "@/interfaces";
import { useRefreshStore } from "@/stores/useRefreshStore";
import { DocType } from "../enums";
import { getBankList, saveSellerBankingInformation } from "../services";

interface SellerBankingInformationFormProps {
  initialData: SellerBankingInformation;
}

export default function SellerBankingInformationForm({
  initialData,
}: SellerBankingInformationFormProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore();
  const bankQuery = useQuery({
    queryKey: ["bank"],
    queryFn: getBankList,
    retry: false,
  });
  const {
    register,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<SellerBankingInformationFormData>({
    resolver: zodResolver(SellerBankingInformationSchema),
    defaultValues: {
      sellerId: "",
      nameAccountHolder: "",
      refIdBank: "",
      rib: "",
      docs: [],
    },
  });

  const bankingInformationMutation = useMutation<
    ServerResponse,
    ErrorResponse,
    SellerBankingInformationFormData
  >({
    mutationFn: (payload) => {
      return saveSellerBankingInformation({
        ...payload,
        sellerId: initialData.id_seller || "",
      });
    },
    onError: (_error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement",
      });
    },
    onSuccess: () => {
      setIsRefreshing(!isRefreshing);
      toast({
        title: "Succès",
        description: "Vos informations ont été enregistrées avec succès",
      });
    },
  });

  const onSubmit = handleSubmit(
    (data) => {
      bankingInformationMutation.mutate(data);
    },
    (error) => {
      console.log("errors", error);
    }
  );

  useEffect(() => {
    if (initialData) {
      reset({
        ...(initialData.id_bank ? { id: initialData.id_bank?.toString() } : {}),
        sellerId: initialData.id_seller,
        nameAccountHolder: initialData.nameAccountHolder,
        refIdBank: initialData.refIdBank?.toString() || "",
        rib: initialData.rib,
        docs: initialData.docs,
      });
    }
  }, [initialData, setValue, reset]);

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            Informations bancaires
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <FormSelectField
            label="Nom de votre banque"
            options={bankQuery.data ? bankQuery.data : []}
            name="refIdBank"
            control={control}
            id="refIdBank"
            required
            error={errors.refIdBank}
          />
          <FormField
            label="Titulaire du compte"
            id="nameAccountHolder"
            placeholder="Entrez le nom du titulaire du compte"
            register={{ ...register("nameAccountHolder") }}
            required
            error={errors.nameAccountHolder}
            helpText="   Doit être identique à la raison sociale de l'Entreprise. Pour les
              auto-entrepreneurs, merci de renseigner votre nom et prénom ou le
              nom commercial de l'Entreprise."
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2  bg-gray-50 rounded-lg p-4 ">
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <FormField
            label="RIB"
            id="rib"
            required
            error={errors.rib}
            placeholder="Entrez votre RIB"
            register={{ ...register("rib") }}
            helpText="Vous trouverez votre RIB sur votre relevé bancaire ou dans votre
            espace bancaire en ligne."
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center rounded-lg p-4 gap-2">
        <p className="text-xl font-bold text-left text-primary">
          Document(s) à fournir
        </p>
        <p className="text-sm text-left text-primary">
          Merci de télécharger les documents suivants
        </p>
        <p className="text-sm font-bold text-primary">
          Rélevé d'identité bancaire (RIB){" "}
          <span className="text-red-500">*</span>
        </p>
        <FileUpload
          files={getValues("docs") as CustomFile[]}
          setFiles={setValue}
          docType={DocType.BANKING}
        />
        {errors.docs && (
          <p className="text-xs ml-2 text-red-500">{errors.docs.message}</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper
          handleSaveProgress={onSubmit}
          saveDisabled={!isValid}
          saveLoading={bankingInformationMutation.isPending}
        />
      </div>
    </div>
  );
}
