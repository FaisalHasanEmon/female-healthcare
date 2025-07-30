import { createContext } from "react";
import useAxios from "../hooks/UseAxios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosRequest = useAxios();

  // New User Registration API
  const userRegistration = async (email, password, confirm_password) => {
    const registrationData = { email, password, confirm_password };
    return await axiosRequest.post("register/", registrationData);
  };

  //   User Login API
  const userLogin = async (email, password) => {
    const loginData = { email, password };
    try {
      return await axiosRequest.post("login/", loginData);
    } catch (err) {
      console.error("Login failed:", err);
      console.log("Login failed:", err);
      return { data: null, error: err.message };
    }
  };

  //   User Logout API
  const userLogout = async () => {
    console.log("userLogged Out");
  };

  //   Password Reset API
  const resetUserPassword = async (email) => {
    try {
      return await axiosRequest.post("password-reset/", { email });
    } catch (error) {
      console.log(error?.response?.data?.error);
      console.log(error?.response?.data);

      // console.log("Password reset failed:", error);
      // console.log("Password reset failed2 :", error.message);
      // console.log("Password reset failed3 :", error.status);
      // return { data: null, error: error.message };
    }
  };
  const value = {
    userRegistration,
    userLogin,
    userLogout,
    resetUserPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
