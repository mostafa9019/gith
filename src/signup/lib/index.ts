import { OperatorRoutes } from "@/operator/enums";
import { DocType } from "../enums";
import {
  CustomFile,
  FormatedSellerInformation,
  SellerInformation,
} from "../interfaces";

export function formatSellerInformation(
  sellerInfo: SellerInformation
): FormatedSellerInformation {
  const formattedSeller: FormatedSellerInformation = {
    id_seller: sellerInfo.id_seller.toString(),
    submited: sellerInfo.submited,
    sellerCreatedAt: sellerInfo.sellerCreatedAt,
    progress: sellerInfo.progress,

    credentials: {
      id_seller: sellerInfo.id_seller.toString(),
      email: sellerInfo.email,
      refIdFunctionInCompany: sellerInfo.refIdFunctionInCompany,
      refIdGender: sellerInfo.refIdGender,
      firstName: sellerInfo.firstName,
      lastName: sellerInfo.lastName,
      hasPower: sellerInfo.hasPower,
      docs: getDocsByType(
        sellerInfo.docs,
        DocType.CRENDENTIAL,
        sellerInfo.id_seller.toString()
      ),
    },

    commercialInfo: {
      id_seller: sellerInfo.id_seller.toString(),
      id_company: sellerInfo.id_company,
      socialRaison: sellerInfo.socialRaison,
      codePostalSiege: sellerInfo.codePostalSiege,
      citySiege: sellerInfo.citySiege,
      isSelfEmployed: sellerInfo.isSelfEmployed,
      ice: sellerInfo.ice,
      rc: sellerInfo.rc,
      nameRepresentantFiscal: sellerInfo.nameRepresentantFiscal,
      adressRepresentantFiscal: sellerInfo.adressRepresentantFiscal,
      capitalCompany: sellerInfo.capitalCompany,
      refIdCurrency: sellerInfo.refIdCurrency,
      companyCreationDate: sellerInfo.companyCreationDate,
      docs: getDocsByType(
        sellerInfo.docs,
        DocType.COMMERCIAL,
        sellerInfo.id_seller.toString()
      ),
    },

    bankingInfo: {
      id_seller: sellerInfo.id_seller.toString(),
      id_bank: sellerInfo.id_bank,
      refIdBank: sellerInfo.refIdBank,
      nameAccountHolder: sellerInfo.nameAccountHolder,
      rib: sellerInfo.rib,
      docs: getDocsByType(
        sellerInfo.docs,
        DocType.BANKING,
        sellerInfo.id_seller.toString()
      ),
    },

    storeInfo: {
      id_seller: sellerInfo.id_seller.toString(),
      id_store: sellerInfo.id_store,
      storeName: sellerInfo.storeName,
      numberProduct: sellerInfo.numberProduct,
      refIdPrincipalCategorie: sellerInfo.refIdPrincipalCategorie,
      hasWebSite: sellerInfo.hasWebSite,
      urlWebSite: sellerInfo.urlWebSite,
      hasPhysicalStore: sellerInfo.hasPhysicalStore,
      sellsBrandedProducts: sellerInfo.sellsBrandedProducts,
      checkedCguOctopia: sellerInfo.checkedCguOctopia,
      checkedAcceptRegistration: sellerInfo.checkedAcceptRegistration,
      checkedCgm: sellerInfo.checkedCgm,
    },
  };

  return formattedSeller;
}

export const getDocsByType = (
  docs: CustomFile[],
  type: DocType,
  sellerId: string
): CustomFile[] => {
  const filteredDocs = docs.filter((doc) => doc.refIdDocType === type);
  if (sellerId) {
    return filteredDocs.map((doc) => ({
      ...doc,
      content: "",
      idSeller: sellerId.toString(),
    }));
  }
  return filteredDocs;
};

export function getDaysRemaining(creationDateStr: string): number {
  const startDate = new Date(creationDateStr);
  if (isNaN(startDate.getTime())) {
    console.error(`Invalid date format: ${creationDateStr}`);
    return 0;
  }
  const deadlineDate = new Date(startDate);
  deadlineDate.setDate(deadlineDate.getDate() + 30);
  const currentDate = new Date();
  const differenceMs = deadlineDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  return Math.max(0, daysRemaining);
}

export const getOperatorHeaderTitle = (path: string): string => {
  switch (path) {
    case OperatorRoutes.DASHBORD:
      return "Vendeurs";
    case OperatorRoutes.OPERATOR:
      return "Vendeurs";
    default:
      return "";
  }
};
