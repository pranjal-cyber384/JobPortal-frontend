import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;