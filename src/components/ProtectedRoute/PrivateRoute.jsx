import { Navigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  // hooks and states
  const { currentUser } = useAuth();

  // if user found then return the element
  if (currentUser) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
