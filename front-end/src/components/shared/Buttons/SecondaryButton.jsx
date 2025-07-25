import { Link } from "react-router-dom";

const SecondaryButton = ({ text, link = "/signup" }) => {
  return (
    <Link to={link}>
      <button className="cursor-pointer  text-[16px] sm:text-[18px] py-[12px] px-[20px] sm:px-[35px] rounded-[6px] border-2 border-brandPrimary text-black hover:bg-brandSecondary  transition">
        <p>{text}</p>
      </button>
    </Link>
  );
};

export default SecondaryButton;
