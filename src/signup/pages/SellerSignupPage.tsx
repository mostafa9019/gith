import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { ProgressBar } from "@/signup/components/ProgressBar";
import { SellerSignupTexts } from "@/signup/constants";
import SellerCredentialsForm from "@/signup/components/SellerCredentiasForm";
import SellerStoreForm from "@/signup/components/SellerStoreForm";
import SellerCommercialInformationForm from "@/signup/components/SellerCommercialInformationForm";
import SellerBankingInformationForm from "@/signup/components/SellerBankingInformationForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormatedSellerInformation } from "@/signup/interfaces";
import { formatSellerInformation, getDaysRemaining } from "@/signup/lib";
import { useStepperStore } from "@/stores/useStepperStore";
import { useRefreshStore } from "@/stores/useRefreshStore";
import { getInitialFormData } from "../services";
import { toast } from "@/hooks/use-toast";
import { getCitiesList } from "@/operator/services";

//TODO : refactor this page to have a better structure and use a use_form provider that contains all the forms
export default function SellerSignupPage() {
  const { transactionId } = useParams();
  const { isRefreshing } = useRefreshStore();
  const {
    currentStep,
    setCurrentStep,
    stepValidationStates,
    canNavigateToStep,
  } = useStepperStore();
  const [sellerInformation, setSellerInformation] =
    useState<FormatedSellerInformation>({} as FormatedSellerInformation);
  const initialFormQuery = useQuery({
    queryKey: ["initialData", isRefreshing],
    queryFn: () => getInitialFormData(transactionId as string),
    retry: false,
  });

  const citiesListQuery = useQuery({
    queryKey: ["citiesList"],
    queryFn: getCitiesList,
  });

  const steps = [
    { number: 1, title: "Coordonnées" },
    { number: 2, title: "Informations commerciales" },
    { number: 3, title: "Informations bancaires" },
    { number: 4, title: "Votre boutique en ligne" },
  ];

  const handleStepChange = (targetStep: number) => {
    if (targetStep === currentStep) return;

    if (!canNavigateToStep(targetStep)) {
      toast({
        variant: "destructive",
        title: "Navigation impossible",
        description:
          "Veuillez compléter les étapes précédentes avant de continuer.",
      });
      return;
    }

    setCurrentStep(targetStep);
  };

  useEffect(() => {
    if (initialFormQuery.isSuccess && initialFormQuery.data) {
      console.log("initialFormQuery.data", initialFormQuery.data);
      const transformed = formatSellerInformation(initialFormQuery.data);
      console.log("transformed", transformed);
      setSellerInformation(transformed);
    }
  }, [initialFormQuery.isSuccess, initialFormQuery.data]);
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col h-full justify-center space-y-4 w-full">
        <div className="flex flex-row items-center justify-between h-full px-4 ">
          <div className="flex flex-row items-center justify-start h-full px-4 ">
            <p className="text-2xl font-bold text-left text-primary">
              {SellerSignupTexts.TITLE}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center h-full px-4 gap-2">
            <p className="text-sm text-left text-primary">
              il vous reste{" "}
              <span className="text-primary font-semibold text-sm">
                {sellerInformation.sellerCreatedAt
                  ? getDaysRemaining(sellerInformation.sellerCreatedAt)
                  : "..."}{" "}
                jours
              </span>{" "}
              pour finaliser votre inscription
            </p>
            <div className="w-full flex items-center gap-2">
              <Progress
                value={sellerInformation.progress}
                className="flex-grow"
              />
              <span className="text-sm font-medium text-primary">
                {sellerInformation.progress || 0}%
              </span>
            </div>
          </div>
        </div>
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onChange={handleStepChange}
          stepValidationStates={stepValidationStates}
        />
        {currentStep === 1 && (
          <SellerCredentialsForm initialData={sellerInformation.credentials} />
        )}
        {currentStep === 2 && (
          <SellerCommercialInformationForm
            initialData={sellerInformation.commercialInfo}
            citiesList={citiesListQuery.data || []}
          />
        )}
        {currentStep === 3 && (
          <SellerBankingInformationForm
            initialData={sellerInformation.bankingInfo}
          />
        )}
        {currentStep === 4 && (
          <SellerStoreForm initialData={sellerInformation.storeInfo} />
        )}
      </div>
    </div>
  );
}
