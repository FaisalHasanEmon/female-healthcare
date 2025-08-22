import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const SignUp = () => {
  const { userRegistration } = useAuth();
  const [showSuccess, setShowSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [loading, setLoading] = useState(true);

  // Toast
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };
  // Handle Goolge Sign Up
  const handleGoogleSignUp = async () => {};

  // Handle Sign Up form
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirmPassword.value;

    try {
      const res = await userRegistration(email, password, confirm_password);
      if (res?.status) {
        setLoading(false);
        setShowSuccess(false);
        setMessage(res?.data?.message);
      }

      console.log(res);
    } catch (er) {
      console.log(er);
      showToast(er?.response?.data?.error);
    }
  };
  return (
    <>
      {showSuccess ? (
        <div className="min-h-screen flex justify-center items-center font-inter ">
          {toast && (
            <div className="toast toast-top toast-center z-50">
              <div className="alert alert-error text-white">
                <span>{toast}</span>
              </div>
            </div>
          )}
          <div className="w-[350px] md:w-[580px] bg-gradient-to-b from-brandSecondary to-brandPrimary rounded-lg p-6 md:p-10 shadow-md">
            {/* Heading and Login page link */}
            <div className="*:text-center space-y-3">
              <h2 className="font-semibold text-[38px] text-black">Sign Up</h2>
              <p>
                already have an account{" "}
                <span className="text-[#808080] underline">
                  <Link to="/login">Log In</Link>
                </span>
              </p>
            </div>
            {/* Heading and Login page link */}
            {/* Google Registration Starts*/}
            <div className="w-full mt-[26px] h-16">
              <button
                className="btn input w-full h-full bg-brandPrimary text-white placeholder:font-medium placeholder:text-[16px]  placeholder:text-white flex justify-center items-center gap-4 "
                onClick={handleGoogleSignUp}
              >
                <figure className="h-[18px] w-[18px]">
                  <img
                    src="/icons/Google.png"
                    alt="Google Icon"
                    className="w-full h-full"
                  />
                </figure>
                <p>Continue With Google</p>
              </button>
            </div>
            {/* Google Registration Ends*/}
            {/* Divider Starts*/}
            <div className="flex justify-center items-center my-6 text-gray-600 text-sm">
              <div className="w-[183px]">
                <hr className="flex-1 border-t border-gray-500 " />
              </div>
              <span className="mx-2">OR</span>
              <div className="w-[183px]">
                <hr className="flex-1 border-t border-gray-500 " />
              </div>
            </div>
            {/* Divider Ends*/}
            {/* Registration Form Starts*/}
            <div>
              <form className="fieldset" onSubmit={handleSubmitSignUp}>
                {/* Email */}
                <div className="h-16 mb-[18px] relative">
                  <span className="flex justify-start items-center gap-4 *:text-[24px]  *:text-white  ml-5 top-3 absolute w-[50px] z-50 ">
                    <HiOutlineMail />
                    <p>|</p>
                  </span>
                  <input
                    type="email"
                    className="input w-full h-full bg-brandPrimary text-white pl-[76px] placeholder:font-medium placeholder:text-[16px]  placeholder:text-white  required"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                {/* Password */}
                <div className="h-16 mb-[18px] relative">
                  <span className="flex justify-start items-center gap-4 *:text-[24px]  *:text-white  ml-5 top-3 absolute w-[50px] z-50 ">
                    <IoLockClosedOutline />
                    <p>|</p>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full h-full bg-brandPrimary text-white pl-[76px] placeholder:font-medium placeholder:text-[16px]  placeholder:text-white  required"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-5 text-white z-50"
                  >
                    {showPassword ? (
                      <FiEyeOff size={24} />
                    ) : (
                      <FiEye size={24} />
                    )}
                  </button>
                </div>
                {/* Confirm Password */}
                <div className="h-16 mb-[18px] relative">
                  <span className="flex justify-start items-center gap-4 *:text-[24px]  *:text-white  ml-5 top-3 absolute w-[50px] z-50 ">
                    <IoLockClosedOutline />
                    <p>|</p>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="input w-full h-full bg-brandPrimary text-white pl-[76px] placeholder:font-medium placeholder:text-[16px]  placeholder:text-white  required"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-5 text-white z-50"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={24} />
                    ) : (
                      <FiEye size={24} />
                    )}
                  </button>
                </div>
                {/* Sign Up Button */}
                <div className="w-full ">
                  <button className="w-full btn btn-neutral mt-4 h-16 bg-gradient-to-r from-brandSecondary to-brandPrimary text-black! font-inter text-[16px] border-brandSecondary">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            {/* Registration Form Ends*/}
            {/* Privacy Policy Section Starts */}
            <div className="mt-3 text-center mb-2.5">
              <p className="text-white">
                Privacy Policy <span className="text-black">and </span>Terms Of
                Service
              </p>
            </div>
            {/* Privacy Policy Section Ends */}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center font-inter ">
          <div className="w-[350px] md:w-[580px] bg-gradient-to-b from-brandSecondary to-brandPrimary rounded-lg p-6 md:p-10 shadow-md flex flex-col justify-center items-center">
            <p className="text-center text-2xl font-medium">{message}</p>
            <Link to="/login">
              <button className="w-full btn btn-neutral mt-4 h-16 bg-gradient-to-r from-brandSecondary to-brandPrimary text-black! font-inter text-[16px] border-brandSecondary">
                Go to login
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
