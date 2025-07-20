import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-[586px] border  mx-auto p-10">
        {/* Heading and Login page link */}
        <div>
          <h2 className="font-semibold text-[38px] text-black">Sign Up</h2>
          <p>
            already have an account{" "}
            <span>
              <Link to="/login">Log In</Link>
            </span>
          </p>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SignUp;
