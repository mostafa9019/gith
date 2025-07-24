import { SellerCrendentialsFormTexts } from "../constants";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import { FormField } from "@/components/FormInput";
import { FormSelectField } from "@/components/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sellerCredentialsFormData, sellerCredentialsSchema } from "../zod";
import { DocType } from "../enums";
import { CustomFile, SellerCredentials } from "../interfaces";
import { ErrorResponse, ServerResponse } from "@/interfaces";
import { toast } from "@/hooks/use-toast";
import Stepper from "@/components/Stepper";
import { useRefreshStore } from "@/stores/useRefreshStore";
import {
  getFunctionList,
  getGenderList,
  saveSellerCredentials,
} from "../services";

interface SellerCredentialsFormProps {
  initialData: SellerCredentials;
}

export default function SellerCredentialsForm({
  initialData,
}: SellerCredentialsFormProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore();
  const genderQuery = useQuery({
    queryKey: ["gender"],
    queryFn: getGenderList,
    retry: false,
  });
  const functionQuery = useQuery({
    queryKey: ["function"],
    queryFn: getFunctionList,
    retry: false,
  });

  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { isValid, errors },
    watch,
    handleSubmit,
    reset,
    control,
  } = useForm<sellerCredentialsFormData>({
    resolver: zodResolver(sellerCredentialsSchema),
  });

  const credentialsMutation = useMutation<
    ServerResponse,
    ErrorResponse,
    sellerCredentialsFormData
  >({
    mutationFn: (payload) => {
      return saveSellerCredentials({
        ...payload,
        id: initialData.id_seller,
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
      credentialsMutation.mutate(data);
    },
    (error) => {
      console.log(error);
    }
  );

  useEffect(() => {
    if (initialData) {
      reset({
        ...(initialData.id_seller
          ? { id: initialData.id_seller.toString() }
          : {}),
        refIdGender: initialData.refIdGender?.toString() || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        refIdFunctionInCompany:
          initialData.refIdFunctionInCompany?.toString() || "",
        hasPower: initialData.hasPower === true,
        docs: initialData.docs,
      });
      setTimeout(() => {
        trigger();
      }, 0);
    }
  }, [initialData, setValue, reset]);

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <div className="flex flex-col items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            {SellerCrendentialsFormTexts.TITLE}
          </p>
          <p className="text-sm text-primary">
            {SellerCrendentialsFormTexts.DESCRIPTION}
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
          <FormSelectField
            label="État civil"
            options={genderQuery.data ? genderQuery.data : []}
            name="refIdGender"
            control={control}
            required
            id="refIdGender"
            error={errors.refIdGender}
          />
          <FormField
            label="Nom"
            placeholder="Entrez votre nom"
            register={{ ...register("firstName") }}
            id="firstName"
            required
            error={errors.firstName}
            initialData={initialData?.firstName}
          />
          <FormField
            label="Prénom"
            placeholder="Entrez votre prénom"
            register={{ ...register("lastName") }}
            id="lastName"
            required
            error={errors.lastName}
          />
          <FormField
            label="E-mail"
            placeholder="Entrez votre e-mail"
            register={{ ...register("email") }}
            id="email"
            required
            error={errors.email}
          />
          <FormSelectField
            label="Fonction occupée au sein de l'entreprise"
            options={functionQuery.data ? functionQuery.data : []}
            name="refIdFunctionInCompany"
            control={control}
            id="refIdFunctionInCompany"
            required
            error={errors.refIdFunctionInCompany}
          />
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="hasPower"
              checked={watch("hasPower")}
              onCheckedChange={(checked) => {
                setValue("hasPower", checked === true, {
                  shouldValidate: true,
                });
              }}
            />
            <label htmlFor="terms" className="text-xs text-primary">
              {SellerCrendentialsFormTexts.TERMS}
            </label>
          </div>
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
          Justificatif d'identité <span className="text-red-500">*</span>
        </p>
        <p className="text-xs  text-primary w-1/2">
          {SellerCrendentialsFormTexts.ID_TERMS}
        </p>
        <FileUpload
          files={getValues("docs") as CustomFile[]}
          setFiles={setValue}
          docType={DocType.CRENDENTIAL}
        />
        {errors.docs && (
          <p className="text-xs ml-2 text-red-500">{errors.docs.message}</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper
          handleSaveProgress={onSubmit}
          saveLoading={credentialsMutation.isPending}
          saveDisabled={!isValid}
        />
      </div>
    </div>
  );
}
