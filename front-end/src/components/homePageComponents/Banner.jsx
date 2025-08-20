import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";
import SecondaryButton from "../../components/shared/Buttons/SecondaryButton";

const Banner = () => {
  return (
    <div className="bg-[#FDFAF5] relative">
      <div className="container px-5 mx-auto pt-[100px] md:pt-[154px] pb-[44px]">
        <div className="flex justify-center   items-center  gap-8">
          {/* Left Section */}
          <div className="w-full  relative">
            {/* Outlined Background Text */}
            {/* // Container with relative positioning */}
            <div className="w-full overflow-hidden text-center flex justify-center items-center">
              {/* Outline Text (Background) */}
              <h1
                className="
                uppercase 
                border
                w-5xl 
                border-black
                font-extrabold 
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] 
                font-playfair-display 
                text-transparent
                [-webkit-text-stroke-width:1px] 
                [-webkit-text-stroke-color:#a6c2b3]
                [text-stroke-width:1px]
                [text-stroke-color:#a6c2b3]
                whitespace-nowrap
                relative
                z-0
                "
              >
                your body's been talking
                <h2
                  className="
                    absolute 
                    top-0 
                    uppercase 
                    font-extrabold 
                    left-13 lg:left-37
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] 
                    font-playfair-display 
                    text-[#FDFAF5]
                    
                 
                    z-10
                   
                    
                    "
                >
                  your body's been talking
                </h2>
              </h1>

              {/* Solid Overlapping Text */}

              {/* translate-y-1 sm:translate-y-2 md:translate-y-3 lg:translate-y-4 text-[#FDFAF5] */}
            </div>
            {/* Main headline */}
            <h2 className="text-center  -top-5 md:-top-7 lg:-top-7 uppercase font-bold text-2xl sm:text-[28px] md:text-4xl relative z-10 leading-tight">
              Your Body's Been Talking. FENYX <br />
              <span className="relative inline-block mt-1">
                Helps You Listen.
                <span className="absolute ml-6 left-0 bottom-1 h-[20px] sm:h-[23px] w-full bg-brandSecondary -z-10"></span>
              </span>
            </h2>
            {/* Paragraph */}
            <p className="top-6 sm:mt-12 font-montserrat text-[#4D4D4D] text-base sm:text-lg md:text-2xl leading-relaxed text-center lg:text-left">
              Hormone, mood, and nutritional support that{" "}
              <br className="hidden md:block" />
              evolves with you – finally a system that sees the{" "}
              <br className="hidden md:block" />
              full picture.
            </p>
            {/* Buttons */}
            <div className="mt-8 flex justify-center items-center lg:justify-start lg:items-start gap-2 sm:gap-[30px]">
              <PrimaryButton text="Start Your Reset" />
              <SecondaryButton text="See How It Works" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-[610px] h-[452px] rounded-[71%_29%_70%_30%_/_70%_28%_72%_30%] bg-brandSecondary absolute top-0 right-0 "></div> */}
    </div>
  );
};

export default Banner;
