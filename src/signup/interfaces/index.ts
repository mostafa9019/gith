import { DocType } from "../enums";
import { sellerCredentialsFormData } from "../zod";

export interface CustomFile {
  id?: number;
  refIdDocType: DocType;
  idSeller: string;
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
}

export interface SellerCommercialInformation {
  id_seller: string;
  id_company?: string;
  socialRaison?: string;
  codePostalSiege?: string;
  citySiege?: string;
  isSelfEmployed?: boolean;
  ice?: string;
  rc?: string;
  nameRepresentantFiscal?: string;
  adressRepresentantFiscal?: string;
  capitalCompany?: string;
  refIdCurrency?: string;
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
  citySiege: string;
  isSelfEmployed: boolean;
  ice: string;
  rc: string;
  nameRepresentantFiscal: string;
  adressRepresentantFiscal: string;
  capitalCompany: string;
  refIdCurrency: string;
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
}

export interface SellerCredentialsFormData_ extends sellerCredentialsFormData {
  id: string;
}
