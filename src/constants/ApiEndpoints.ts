const WSList = {
  getGenderList: "/InscriptionSeller/GenderList",
  getSellerStatusList: "/InscriptionSeller/StatusList",
  getSellerFunctionList: "/InscriptionSeller/FunctionSellerInCompanyList",
  getCurrencyList: "/InscriptionSeller/CurrencyList",
  getBankList: "/InscriptionSeller/BankList",
  getMainCategoryList: "/InscriptionSeller/PrincipalCategorieStoreList",
  getSourceList: "/InscriptionSeller/SourceList",
  getHubList: "/InscriptionSeller/HubList",
  sendOtp: "/InscriptionSeller/SendCodeOtp",
  verifyOtp: "/InscriptionSeller/VerificationOtp",
  getInitialFormData: (transactionId: string) =>
    "/InscriptionSeller/GetInitialInformations?id=" + transactionId,
  saveSellerCredentials: "/InscriptionSeller/AddUpdateCoordonnees",
  saveSellerCommercialInformation:
    "/InscriptionSeller/AddUpdateCommercialInformations",
  saveSellerBankingInformation: "/InscriptionSeller/AddUpdateBankInformations",
  saveSellerStoreInformation: "/InscriptionSeller/AddUpdateOnlineStore",
  getSellerList: "/InscriptionSeller/GetAllSellers",
  authenticateUser: "/Authentification/login",
  processSellerByFinanceAgent: "/InscriptionSeller/ValidationRejectCommercial",
  processSellerByCommercialAgent: "/InscriptionSeller/ValidationRejectFinance",
  getCitiesList: "/InscriptionSeller/CitiesList",
  checkStoreName: "/InscriptionSeller/CheckOnlineStore",
};

const APIEndpoints = {
  list: () => {
    return WSList;
  },
};

export default APIEndpoints;
