export enum SellerStatus {
  DRAFT = 1,
  PENDING = 2,
  DONE = 3,
  FINANCE_VALIDATION = 4,
  FINANCE_REJECTION = 5,
  COMMERCIAL_VALIDATION = 6,
  COMMERCIAL_REJECTION = 7,
}

export enum OperatorRoutes {
  DASHBORD = "/operator/dashboard",
  OPERATOR = "/operator",
  LOGIN = "/operator/login",
}
