"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { type SellerStoreFormData, SellerStoreSchema } from "../zod"
import type { SellerStoreInformation } from "../interfaces"
import { useStepperStore } from "@/stores/useStepperStore"

interface UseStoreFormProps {
  initialData?: SellerStoreInformation
  stepIndex: number
}

function prepareInitialData(initialData: SellerStoreInformation) {
    return {
      ...(initialData.id_store ? { id: initialData.id_store.toString() } : {}),
      name: initialData.storeName || "",
      numberProduct: initialData.numberProduct?.toString() || "",
      refIdPrincipalCategorie: initialData.refIdPrincipalCategorie?.toString() || "",
      hasWebSite: initialData.hasWebSite || false,
      urlWebSite: initialData.urlWebSite || "",
      hasPhysicalStore: initialData.hasPhysicalStore || false,
      sellsBrandedProducts: initialData.sellsBrandedProducts || false,
      checkedCguOctopia: initialData.checkedCguOctopia || false,
      checkedAcceptRegistration: initialData.checkedAcceptRegistration || false,
      checkedCgm: initialData.checkedCgm || false,
    }
  } 
export function useStoreForm({ initialData, stepIndex }: UseStoreFormProps) {
  const { setStepValidation, getStepFormData, setStepFormData } = useStepperStore()

  const form = useForm<SellerStoreFormData>({
    resolver: zodResolver(SellerStoreSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      numberProduct: "",
      refIdPrincipalCategorie: "",
      hasWebSite: false,
      urlWebSite: "",
      hasPhysicalStore: false,
      sellsBrandedProducts: false,
      checkedCguOctopia: false,
      checkedAcceptRegistration: false,
      checkedCgm: false,
    },
  })

  const {
    reset,
    getValues,
    formState: { isValid },
  } = form

  useEffect(() => {
    return () => {
      const currentFormValues = getValues()
      if (currentFormValues && Object.keys(currentFormValues).length > 0) {
        setStepFormData(stepIndex, currentFormValues)
      }
    }
  }, [getValues, setStepFormData, stepIndex])

  useEffect(() => {
    setStepValidation(stepIndex, isValid)
  }, [isValid, setStepValidation, stepIndex])

  useEffect(() => {
    if (initialData) {
      const defaultData = prepareInitialData(initialData)
      reset(defaultData)
      setStepFormData(stepIndex, defaultData)
    } else {
      const storedData = getStepFormData(stepIndex)
      if (storedData && Object.keys(storedData).length > 0) {
        reset(storedData)
      }
    }
  }, [initialData, reset, getStepFormData, setStepFormData, stepIndex])

  return {
    ...form,
    isValid,
  }
}

