import PrimaryButton from "../shared/Buttons/PrimaryButton";

const SmartSupport = () => {
  const supportItems = [
    {
      id: 1,
      image: "/smart-support/image-1.png",
      title: "FENYX Support Chat",
      description:
        "Get compassionate, AI-guided help when your body feels confusing, instant check-ins, symptom decoding, and next steps.",
    },
    {
      id: 2,
      image: "/smart-support/image-2.png",
      title: "Mood + Body Syncing",
      description:
        "Instant, Intelligent Help Anytime. Get round-the-clock answers from our smart AI assistant—trained to support your health journey with compassion and accuracy.",
    },
    {
      id: 3,
      image: "/smart-support/image-3.png",
      title: "Cycle-Aligned Nutrition",
      description:
        "Nutrition insights based on your cycle + cravings — designed to help you feel nourished, not restricted. FENYX guides you with gentle food suggestions that match your hormonal shifts, mood, and energy — because what you need changes, and that’s okay.",
    },
    {
      id: 4,
      image: "/smart-support/image-4.png",
      title: "Private, Protected, Yours",
      description:
        "Your dat is sacred. Built with HIPPA-grade privacy so your health stays yours. Not mined or shared",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-5 mx-auto">
        {/* What we Do logo Starts */}
        <div className="w-[168px] flex  justify-center items-center gap-2 mb-[83px] mx-auto  py-[7px] px-[14px] border-2 border-brandPrimary rounded-[6px]">
          <div className="h-2.5 w-2.5 rounded-full bg-brandSecondary"></div>
          <p>What We Do</p>
        </div>
        {/* What we Do logo Ends */}
        {/* Smart Support Text Starts */}
        <div className="relative w-full flex flex-col justify-center items-center lg:items-end  mb-[171px] text-center lg:text-right">
          {/* Your Body's been talking section starts */}
          {/* Background Text */}
          <h2 className="uppercase font-extrabold text-[24px] sm:text-[40px] lg:text-[64px] text-transparent font-playfair-display -z-10 [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#a6c2b3] whitespace-nowrap overflow-hidden mr-0">
            your body's been talking
          </h2>

          {/* Solid Top Text */}
          <h2 className="absolute top-0 uppercase font-extrabold text-[24px] sm:text-[40px] lg:text-[64px] font-playfair-display text-base-100 whitespace-nowrap overflow-hidden mr-0">
            your body's been talking
          </h2>
          {/* Your Body's been talking section ends */}
          <h2 className="text-3xl lg:text-[64px] font-bold text-gray-900 -mt-5 lg:-mt-13 z-45 relative">
            YOU DESERVE SM
            <span className="after:content-[''] after:absolute after:left-27  lg:after:left-[58%] after:bottom-2 after:h-[12.5px] lg:after:h-[23px] lg:after:w-[414px] after:w-[150px]    after:bg-brandSecondary after:rounded-0 after:-z-50">
              ART SUPPORT
            </span>{" "}
            <br />
          </h2>
          <h2 className="text-3xl lg:text-[64px] font-bold text-gray-900  mb-10">
            FOR A COMPLEX SEASON
          </h2>
          <PrimaryButton
            text={"Start Your Reset"}
            link="/signup"
          ></PrimaryButton>
        </div>
        {/* Smart Support Text Ends */}
        {/* Card Items Starts */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Item 1 */}
          {supportItems.map((item) => (
            <div key={item?.id}>
              <figure className="mb-[23px] w-20 h-20 mx-auto">
                <img src={item?.image} alt="Item Image" className="w-full" />
              </figure>
              <h3 className="text-2xl font-extrabold uppercase text-brandPrimary mb-2">
                {item?.title}
              </h3>
              <div className="w-[117px] h-1 mx-auto bg-brandSecondary mb-6"></div>
              <p className="text-gray-600 text-sm font-montserrat font-normal text-[16px]">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
        {/* Card Items Ends */}
      </div>
      <div></div>
    </section>
  );
};

export default SmartSupport;
