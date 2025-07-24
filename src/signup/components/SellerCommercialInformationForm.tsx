import FileUpload from "@/components/FileUpload";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import DateSelect from "@/components/DateSelect";
import { FormField } from "@/components/FormInput";
import { FormSelectField } from "@/components/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SellerCommercialInformationFormData,
  SellerCommercialInformationSchema,
} from "../zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomFile, SellerCommercialInformation } from "../interfaces";
import Stepper from "@/components/Stepper";
import { toast } from "@/hooks/use-toast";
import { ErrorResponse, ServerResponse } from "@/interfaces";
import { useRefreshStore } from "@/stores/useRefreshStore";
import { DocType } from "../enums";
import { getCurrencyList, saveSellerCommercialInformation } from "../services";

interface SellerCommercialInformationFormProps {
  initialData: SellerCommercialInformation;
}

export default function SellerCommercialInformationForm({
  initialData,
}: SellerCommercialInformationFormProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const currencyQuery = useQuery({
    queryKey: ["currency"],
    queryFn: getCurrencyList,
    retry: false,
  });
  const {
    register,
    control,
    watch,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SellerCommercialInformationFormData>({
    resolver: zodResolver(SellerCommercialInformationSchema),
    defaultValues: {},
  });

  const commercialInformationMutation = useMutation<
    ServerResponse,
    ErrorResponse,
    SellerCommercialInformationFormData
  >({
    mutationFn: (payload) => {
      return saveSellerCommercialInformation({
        ...payload,

        sellerId: initialData.id_seller,
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
      commercialInformationMutation.mutate(data);
    },
    (error) => {
      console.log("errors", error);
    }
  );

  useEffect(() => {
    if (selectedDate) {
      setValue("companyCreationDate", selectedDate.toISOString(), {
        shouldValidate: true,
      });
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (initialData) {
      reset({
        ...(initialData.id_company
          ? { id: initialData.id_company.toString() }
          : {}),
        socialRaison: initialData.socialRaison || "",
        citySiege: initialData.citySiege || "",
        codePostalSiege: initialData.codePostalSiege || "",
        isSelfEmployed: initialData.isSelfEmployed || false,
        companyCreationDate: initialData.companyCreationDate || "",
        ice: initialData.ice || "",
        rc: initialData.rc || "",
        nameRepresentantFiscal: initialData.nameRepresentantFiscal || "",
        adressRepresentantFiscal: initialData.adressRepresentantFiscal || "",
        capital: initialData.capitalCompany?.toString() || "",
        refIdCurrency: initialData.refIdCurrency?.toString() || "",
        docs: initialData.docs,
      });
    }
  }, [initialData, setValue, reset]);

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            Informations commerciales de l'entreprise
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4">
          <FormField
            label="Raison sociale"
            required
            placeholder="Entrez votre raison sociale"
            register={{ ...register("socialRaison") }}
            id=""
            error={errors.socialRaison}
            helpText="Doit être indentique à la raison sociale figurant sur le document d'enregistrement de l'entreprise"
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            Adresse du siege social
          </p>
          <p className="text-xs text-primary">
            Doit être indentique à la raison sociale figurant sur le document
            d'enregistrement de l'entreprise
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <div className="flex flex-row items-center justify-between sm:w-1/2 w-full gap-4">
            <FormField
              label="Ville"
              required
              placeholder="Entrez votre ville"
              register={{ ...register("citySiege") }}
              id="citySiege"
              error={errors.citySiege}
            />
            <FormField
              label="Code postal"
              required
              placeholder="Entrez votre code postal"
              register={{ ...register("codePostalSiege") }}
              id="codePostalSiege"
              error={errors.codePostalSiege}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2  bg-gray-50 rounded-lg p-4 ">
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <div className="grid grid-cols-1 w-full gap-2">
            <label htmlFor="email" className="text-sm font-bold text-primary">
              Forme juridique de l'entreprise{" "}
            </label>
            <div className="flex items-center space-x-2 px-2 py-1">
              <Checkbox
                id="isSelfEmployed"
                checked={watch("isSelfEmployed")}
                onCheckedChange={(checked) => {
                  setValue("isSelfEmployed", checked === true, {
                    shouldValidate: true,
                  });
                }}
              />
              <label htmlFor="terms" className="text-xs text-primary">
                Auto-entrepreneur
              </label>
            </div>
          </div>
          <FormField
            label="Numéro ICE de l'entreprise"
            placeholder="Entrez votre numéro ICE"
            register={{ ...register("ice") }}
            id="ice"
            required
            error={errors.ice}
          />
          <FormField
            label="RC de l'entreprise"
            placeholder="Entrez votre RC"
            register={{ ...register("rc") }}
            id="rc"
            required
            error={errors.rc}
          />
          <FormField
            label="Nom du représentant fiscal"
            placeholder="Entrez le nom du représentant fiscal"
            register={{ ...register("nameRepresentantFiscal") }}
            id="nameRepresentantFiscal"
          />
          <FormField
            label="Adresse du représentant fiscal"
            placeholder="Entrez l'adresse du représentant fiscal"
            register={{ ...register("adressRepresentantFiscal") }}
            id="adressRepresentantFiscal"
          />
          <div className="flex flex-row items-center justify-between sm:w-1/2 w-full gap-4">
            <FormField
              label="Capital social"
              type="number"
              className="w-full"
              placeholder="Entrez le capital social"
              register={{ ...register("capital") }}
              id="capital"
              required
              error={errors.capital}
            />
            <FormSelectField
              className="w-full"
              label="Concevoir"
              required
              options={currencyQuery.data ? currencyQuery.data : []}
              name="refIdCurrency"
              control={control}
              id="refIdCurrency"
              error={errors.refIdCurrency}
            />
          </div>
          <div className="grid grid-cols-1 w-full sm:w-1/2 gap-2">
            <DateSelect
              label="Date de création de l'entreprise"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <p className="text-xs text-primary">
              Doit être indentique à la raison sociale figurant sur le document
              d'enregistrement de l'entreprise
            </p>
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
          Document officiel justifiant l'existence de l'entreprise et daté de
          moins de 3 mois <span className="text-red-500">*</span>
        </p>
        <p className="text-xs  text-primary w-1/2">
          Modèle 3 du registre de commerce de moins de 3 moins
        </p>
        <FileUpload
          files={getValues("docs") as CustomFile[]}
          setFiles={setValue}
          docType={DocType.COMMERCIAL}
        />
        {errors.docs && (
          <p className="text-xs ml-2 text-red-500">{errors.docs.message}</p>
        )}
      </div>
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
