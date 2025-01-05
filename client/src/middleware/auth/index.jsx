import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/common";

const AuthMiddleware = () => {
  const token = getToken();
  console.log(token, "from token ----");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthMiddleware;
