import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router"; // Ensure the correct package is imported

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const authContext = useContext(AuthContext);

  // Handle the case where AuthContext is null
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { state } = authContext;

  console.log("auth", state.isAuthenticated);

  return state.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
