const BoxHeading = ({ text }) => {
  return (
    <div className="flex w-[190px] justify-start  items-center gap-5 mx-auto  py-[7px] px-[14px] border-2 border-brandPrimary rounded-[6px]">
      <div className="h-2.5 w-2.5 rounded-full bg-brandSecondary"></div>
      <p className="text-[20px]">{text}</p>
    </div>
  );
};

export default BoxHeading;
