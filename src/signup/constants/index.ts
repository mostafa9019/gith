import type {
  SellerBankingInformation,
  SellerCommercialInformation,
  SellerStoreInformation,
} from "@/signup/interfaces";

export enum SellerSignupTexts {
  TITLE = "Bienvenue sur notre espace d'inscription vendeur",
}

export enum SellerCrendentialsFormTexts {
  TITLE = "Coordonnées",
  DESCRIPTION = "Nous vous remercions de préciser ci-dessous les coordonnées de la personne qui sera le \"contact principal\". Ce dernier a accès au compte de la boutique sur l'interface vendeur de Marjane et fournit les informations d'enregistrement au nom du Dirigeant de la société. Si le \"contact principal\" n'est pas le dirigeant, la pièce d'identité de ce dernier devra être fournie.",
  TERMS = "En cochant cette case je reconnais avoir été mandaté par la Direction de l'entreprise pour exercer tout pouvoir sur la Marketplace de Marjane au nom et pour le compte de la société *",
  ID_TERMS = " Copie recto/verso de votre carte nationale d'identité/passeport en cours de validité. - En complément, si vous n'êtes pas le Dirigeant de l'entreprise, copie recto/verso de la carte nationale d'identité/passeport en cours de validité du Dirigeant.",
}
export enum SellerCommercialInformationFormTexts {
  TITLE = "Informations commerciales de l'entreprise",
}

export const RoleOptions: { label: string; value: string }[] = [
  {
    label: "Directeur général / PDG",
    value: "directeur_general_pdg",
  },
  {
    label: "Gérant",
    value: "gerant",
  },
  {
    label: "Directeur commercial",
    value: "directeur_commercial",
  },
  {
    label: "Directeur financier",
    value: "directeur_financier",
  },
  {
    label: "Directeur administratif",
    value: "directeur_administratif",
  },
  {
    label: "Responsable des achats",
    value: "responsable_achats",
  },
  {
    label: "Responsable marketing",
    value: "responsable_marketing",
  },
  {
    label: "Comptable",
    value: "comptable",
  },
  {
    label: "Administrateur",
    value: "administrateur",
  },
  {
    label: "Associé",
    value: "associe",
  },
  {
    label: "Secrétaire général",
    value: "secretaire_general",
  },
  {
    label: "Responsable des opérations",
    value: "responsable_operations",
  },
];

export const defaultBankingInfo: SellerBankingInformation = {
  id_seller: "",
  id_bank: "",
  refIdBank: "",
  nameAccountHolder: "",
  rib: "",
  docs: [],
};

export const defaultCommercialInfo: SellerCommercialInformation = {
  id_seller: "",
  id_company: "",
  socialRaison: "",
  codePostalSiege: "",
  refIdCitySiege: "",
  isSelfEmployed: false,
  ice: "",
  rc: "",
  nameRepresentantFiscal: "",
  adressRepresentantFiscal: "",
  capitalCompany: "",
  // refIdCurrency: "",
  companyCreationDate: "",
  docs: [],
};

export const defaultStoreInfo: SellerStoreInformation = {
  id_seller: "",
  id_store: "",
  storeName: "",
  numberProduct: "",
  refIdPrincipalCategorie: "",
  hasWebSite: false,
  urlWebSite: "",
  hasPhysicalStore: false,
  sellsBrandedProducts: false,
  checkedCguOctopia: false,
  checkedAcceptRegistration: false,
  checkedCgm: false,
};
