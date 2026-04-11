import React from "react";
import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

const RoleRoute = ({ children, allowedRole }) => {
  const role = getRole();

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
