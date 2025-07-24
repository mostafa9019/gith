import React from "react";
import { Navigate, useParams } from "react-router-dom";

const WithValidGuid = ({
  children,
  paramName = "id",
  fallbackPath = "/not-found",
}: {
  children: React.ReactNode;
  paramName?: string;
  fallbackPath?: string;
}) => {
  const params = useParams();
  const guidValue = params[paramName];

  const guidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const isValidGuid = guidValue && guidPattern.test(guidValue);

  if (!isValidGuid) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default WithValidGuid;
