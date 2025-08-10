import { HiOutlineMail } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";

const ResetPassword = () => {
  const { resetUserPassword } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const res = await resetUserPassword(email);

    // Optionally use: await resetUserPassword(email);
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-inter ">
      <div className="w-[350px] md:w-[580px] bg-gradient-to-b from-brandSecondary to-brandPrimary rounded-lg p-6 md:p-10 shadow-md">
        {/* Heading and Login page link */}
        <div className="*:text-center space-y-3">
          <h2 className="font-semibold text-[38px] text-black mb-5">
            Enter Your Email
          </h2>
        </div>
        {/* Registration Form Starts */}
        <div>
          <form className="fieldset" onSubmit={handleResetPassword}>
            {/* Email */}
            <div className="h-16 mb-[18px] relative">
              <span className="flex justify-start items-center gap-4 *:text-[24px] *:text-white ml-5 top-3 absolute w-[50px] z-50 ">
                <HiOutlineMail />
                <p>|</p>
              </span>
              <input
                type="email"
                className="input w-full h-full bg-brandPrimary text-white pl-[76px] placeholder:font-medium placeholder:text-[16px] placeholder:text-white required"
                placeholder="Email"
                name="email"
              />
            </div>

            {/* Button */}
            <div className="w-full ">
              <button className="w-full btn btn-neutral mt-4 h-16 bg-gradient-to-r from-brandSecondary to-brandPrimary text-black! font-inter text-[16px] border-brandSecondary">
                Reset My Password
              </button>
            </div>
          </form>
        </div>
        {/* Registration Form Ends */}
      </div>
    </div>
  );
};

export default ResetPassword;
