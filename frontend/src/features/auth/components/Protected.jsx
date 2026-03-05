import React from "react";
import { useAuth } from "../hook/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

export default Protected;
