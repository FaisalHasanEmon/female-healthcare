import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";
import SecondaryButton from "../../components/shared/Buttons/SecondaryButton";

const Banner = () => {
  console.log(window.innerWidth);
  return (
    <div className="bg-[#FDFAF5]">
      <div className="container px-5 mx-auto pt-[100px] md:pt-[154px] pb-[44px]">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-7/12 relative">
            {/* Outlined Background Text */}
            <h2 className="uppercase font-extrabold text-[24px] sm:text-[40px] md:text-[60px] text-transparent font-playfair-display -z-10 [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#a6c2b3] whitespace-nowrap overflow-hidden">
              your body's been talking
            </h2>

            {/* Solid Top Text */}
            <h2 className="absolute top-0 uppercase font-extrabold text-[24px] sm:text-[40px] md:text-[60px] font-playfair-display text-white whitespace-nowrap overflow-hidden">
              your body's been talking
            </h2>

            {/* Main headline */}
            <h2 className="-top-12 uppercase font-bold text-[20px] sm:text-[28px] md:text-[44px] relative z-10 leading-tight">
              Your Body's Been Talking. FENYX <br />
              <span className="relative inline-block mt-1">
                Helps You Listen.
                <span className="absolute ml-6 left-0 bottom-1 h-[20px] sm:h-[23px] w-full bg-brandSecondary -z-10"></span>
              </span>
            </h2>

            {/* Paragraph */}
            <p className="top-6 sm:mt-12 font-montserrat text-[#4D4D4D] text-base sm:text-lg md:text-2xl leading-relaxed">
              Hormone, mood, and nutritional support that{" "}
              <br className="hidden md:block" />
              evolves with you – finally a system that sees the{" "}
              <br className="hidden md:block" />
              full picture.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-2 sm:gap-[30px]">
              <PrimaryButton text="Start Your Reset" />
              <SecondaryButton text="See How It Works" />
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <img
              src="/bannerImage.png"
              alt="Banner Image"
              className="w-[220px] sm:w-[280px] md:w-[304px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
