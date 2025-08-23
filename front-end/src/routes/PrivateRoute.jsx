import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const checkToken = localStorage.getItem("fenyxFemme-accessToken");

  console.log(checkToken);
  if (checkToken) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
