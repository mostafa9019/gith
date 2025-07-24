import Stepper from "@/components/Stepper";
import type { SellerStoreInformation } from "../interfaces";
import { useStoreForm } from "@/signup/hooks/useStoreForm";
import { useStoreMutation } from "@/api/mutations/useStoreMutation";
import { useStoreQueries } from "@/api/queries/useStoreQueries";
import { StoreInformationSection } from "@/signup/components/storeInformation/StoreInformationSection";
import { StoreConfigurationSection } from "@/signup/components/storeInformation/StoreConfigurationSection";
import { StoreTermsSection } from "@/signup/components/storeInformation/StoreTermsSection";
import { useStepperStore } from "@/stores/useStepperStore";
import { toast } from "@/hooks/use-toast";
import {
  useGetCheckStoreName,
  type CheckStoreNameResponse,
} from "@/api/queries/useCheckStoreName";
import { defaultBankingInfo } from "../constants";

interface SellerStoreFormProps {
  initialData?: SellerStoreInformation;
}

const STEP_INDEX = 4;

export default function SellerStoreForm({ initialData }: SellerStoreFormProps) {
  const { categoryOptions, hubOptions } = useStoreQueries();
  const { areAllStepsValid } = useStepperStore();
  const storeData = initialData || defaultBankingInfo;

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    isValid,
  } = useStoreForm({ initialData, stepIndex: STEP_INDEX });

  const storeInformationMutation = useStoreMutation({ initialData });
  const storeName = watch("name");

  const { checkStoreName } = useGetCheckStoreName();

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        // Check if store name exists
        const storeNameCheck = await new Promise<CheckStoreNameResponse | null>(
          (resolve) => {
            checkStoreName(
              {
                name: storeName,
                sellerId: Number(storeData?.id_seller),
              },
              {
                onSuccess: (response) => resolve(response),
                onError: (error) => {
                  console.error("Store name check error:", error);
                  resolve(null);
                },
              }
            );
          }
        );

        if (!storeNameCheck?.success) {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Boutique existe déjà",
          });
          return;
        }

        await storeInformationMutation.mutateAsync(data);

        toast({
          title: "Inscription finalisée !",
          description:
            "Votre inscription a été soumise avec succès. Vous serez contacté prochainement.",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la soumission du formulaire.",
        });
      }
    },
    (error) => {
      console.log("Form validation errors:", error);
    }
  );

  const handleFinalize = () => {
    if (!areAllStepsValid()) {
      toast({
        variant: "destructive",
        title: "Inscription incomplète",
        description:
          "Veuillez compléter et valider toutes les étapes avant de finaliser votre inscription.",
      });
      return;
    }

    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Formulaire invalide",
        description:
          "Veuillez corriger les erreurs dans ce formulaire avant de finaliser.",
      });
      return;
    }

    onSubmit();
  };

  const canFinalize =
    isValid && areAllStepsValid() && !storeInformationMutation.isPending;

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <StoreInformationSection register={register} errors={errors} />

      <StoreConfigurationSection
        control={control}
        register={register}
        errors={errors}
        categoryOptions={categoryOptions}
        hubOptions={hubOptions}
      />

      <StoreTermsSection watch={watch} setValue={setValue} />

      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper
          handleSaveProgress={onSubmit}
          saveDisabled={!isValid}
          saveLoading={storeInformationMutation.isPending}
          handleFinalize={handleFinalize}
          finalizeDisabled={!canFinalize}
          finalizeLoading={false}
        />
      </div>
    </div>
  );
}
