import { Link } from "react-router-dom";

const PrimaryButton = ({ text, link = "/signup" }) => {
  return (
    <Link to={link}>
      <button className="font-semibold text-[16px] sm:text-[18px] text-white px-[20px] sm:px-[35px] py-[13px] rounded-[6px] bg-brandPrimary cursor-pointer hover:bg-brandSecondary hover:text-brandPrimary active:border-brandPrimary">
        {text}
      </button>
    </Link>
  );
};

export default PrimaryButton;
