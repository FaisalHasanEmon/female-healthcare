const StartYourRestButton = ({ text }) => {
  return (
    <button className="font-semibold text-[20px] text-white px-[35px] py-[13px] rounded-[6px] bg-brandPrimary cursor-pointer hover:bg-brandSecondary hover:text-brandPrimary hover:font-bold active:border-2  active:border-brandPrimary">
      {text}
    </button>
  );
};

export default StartYourRestButton;
