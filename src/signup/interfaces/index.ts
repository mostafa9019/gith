import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DocType } from "../enums";
import {
  type SellerCommercialInformationFormData,
  type sellerCredentialsFormData,
  type SellerStoreFormData,
} from "@/signup/zod/index";
import { ListOption } from "@/interfaces";

export interface CustomFile {
  id?: number;
  refIdDocType: DocType;
  idSeller: string | number | null;
  name: string;
  content: string;
  contentType: string;
  refNameDocType?: string;
  path?: string;
}

export interface OtpPayload {
  phone: string;
  email: string;
  refIdSource: string;
  transactionId: string;
}
export interface OtpVerificationPayload {
  email: string;
  otpCode: string;
  transactionId: string;
}

export interface SellerCredentials {
  id_seller: string;
  email: string;
  refIdGender: string;
  refIdFunctionInCompany: string;
  firstName: string;
  lastName: string;
  hasPower: boolean;
  docs: CustomFile[];
  isDirector?: boolean;
}

export interface SellerCommercialInformation {
  id_seller: string;
  id_company?: string;
  socialRaison?: string;
  codePostalSiege?: string;
  refIdCitySiege?: string;
  isSelfEmployed?: boolean;
  ice?: string;
  rc?: string;
  nameRepresentantFiscal?: string;
  adressRepresentantFiscal?: string;
  capitalCompany?: string;
  // refIdCurrency?: string;
  companyCreationDate?: string;
  docs?: CustomFile[];
}

export interface SellerBankingInformation {
  id_seller?: string;
  id_bank?: string;
  refIdBank?: string;
  nameAccountHolder?: string;
  rib?: string;
  docs?: CustomFile[];
}

export interface SellerStoreInformation {
  id_seller: string;
  id_store: string;
  storeName: string;
  numberProduct: string;
  refIdPrincipalCategorie: string;
  hasWebSite: boolean;
  urlWebSite: string;
  hasPhysicalStore: boolean;
  sellsBrandedProducts: boolean;
  checkedCguOctopia: boolean;
  checkedAcceptRegistration: boolean;
  checkedCgm: boolean;
}
export interface SellerInformation {
  id_seller: number;
  submited: boolean;
  sellerCreatedAt: string;
  refIdFunctionInCompany: string;
  id_company: string;
  id_bank: string;
  id_store: string;
  docs: CustomFile[];
  progress: number;
  email: string;
  refIdGender: string;
  firstName: string;
  lastName: string;
  hasPower: boolean;
  socialRaison: string;
  codePostalSiege: string;
  refIdCitySiege: string;
  isSelfEmployed: boolean;
  ice: string;
  rc: string;
  nameRepresentantFiscal: string;
  adressRepresentantFiscal: string;
  capitalCompany: string;
  // refIdCurrency: string;
  companyCreationDate: string;
  refIdBank: string;
  nameAccountHolder: string;
  rib: string;
  storeName: string;
  numberProduct: string;
  refIdPrincipalCategorie: string;
  hasWebSite: boolean;
  urlWebSite: string;
  hasPhysicalStore: boolean;
  sellsBrandedProducts: boolean;
  checkedCguOctopia: boolean;
  checkedAcceptRegistration: boolean;
  checkedCgm: boolean;
  isDirector?: boolean;
}

export interface FormatedSellerInformation {
  id_seller: string;
  submited: boolean;
  sellerCreatedAt: string;
  progress: number;
  credentials: SellerCredentials;
  commercialInfo: SellerCommercialInformation;
  bankingInfo: SellerBankingInformation;
  storeInfo: SellerStoreInformation;

  IsDirector?: boolean;
}

export interface SellerCredentialsFormData_ extends sellerCredentialsFormData {
  id: string;
}

export type TStep = {
  number: number;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
};

export type TProgressBarProps = {
  steps: TStep[];
  currentStep: number;
  onChange?: (step: number) => void;
  stepValidationStates?: Record<number, boolean>;
  className?: string;
};

export type CredentialsDocumentSectionProps = {
  setValue: UseFormSetValue<sellerCredentialsFormData>;
  getValues: UseFormGetValues<sellerCredentialsFormData>;
  errors: FieldErrors<sellerCredentialsFormData>;
  sellerId?: string;
};

export type TCredentialsInformationSectionProps = {
  control: Control<sellerCredentialsFormData>;
  register: UseFormRegister<sellerCredentialsFormData>;
  errors: FieldErrors<sellerCredentialsFormData>;
  watch: UseFormWatch<sellerCredentialsFormData>;
  setValue: UseFormSetValue<sellerCredentialsFormData>;
  genderOptions: Array<{ id: number; name: string }>;
  functionOptions: Array<{ id: number; name: string }>;
  initialData?: SellerCredentials;
};

export type TCommercialInformationSectionProps = {
  control: Control<SellerCommercialInformationFormData>;
  register: UseFormRegister<SellerCommercialInformationFormData>;
  errors: FieldErrors<SellerCommercialInformationFormData>;
  watch: UseFormWatch<SellerCommercialInformationFormData>;
  setValue: UseFormSetValue<SellerCommercialInformationFormData>;

  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  citiesList: ListOption[];
};

export type TStoreInformationSectionProps = {
  register: UseFormRegister<SellerStoreFormData>;
  errors: FieldErrors<SellerStoreFormData>;
};

export type TStoreConfigurationSectionProps = {
  control: Control<SellerStoreFormData>;
  register: UseFormRegister<SellerStoreFormData>;
  errors: FieldErrors<SellerStoreFormData>;
  categoryOptions: Array<{ id: number; name: string }>;
  hubOptions: Array<{ id: number; name: string }>;
};

export type TStoreTermsSectionProps = {
  watch: UseFormWatch<SellerStoreFormData>;
  setValue: UseFormSetValue<SellerStoreFormData>;
};
