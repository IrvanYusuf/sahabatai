import React from "react";
import { useUser } from "../context/userContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  console.log(user);

  if (isLoading) {
    return "loading....";
  }

  if (!user) {
    return navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
