// import { BsListNested } from "react-icons/bs";
// import StartYourRestButton from "../../components/shared/Buttons/StartYourRestButton";
// // import "./Home.css";
// const Home = () => {
//   return (
//     <>
//       <div className="bg-[#FDFAF5]">
//         <div className="container px-5 mx-auto pt-[154px] pb-[44px]">
//           <div className="flex flex-col-reverse lg:flex-row ">
//             {/* Left Side Section */}
//             <div className="w-[70%]">
//               <h2 className="-ml-5 uppercase font-extrabold text-[30px] md:text-[60px] text-transparent  font-playfair-display -z-10  [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#a6c2b3] ">
//                 your body's been talking
//               </h2>
//               <h2 className="-ml-5 absolute top-38.5  text-base-100 uppercase font-extrabold text-[30px] md:text-[60px]  font-playfair-display text white">
//                 your body's been talking
//               </h2>

//               <h2 className="-mt-13 absolute z-50! uppercase font-bold text-[22px] md:text-[44px]">
//                 Change to Your Body's Been Talking. FENYX <br />{" "}
//                 <span className="after:content-[''] after:absolute after:left-0 after:bottom-2 after:h-[23px] after:w-[484px] after:ml-6npm   after:bg-brandSecondary after:rounded-0 after:-z-50">
//                   Helps You Listen.
//                 </span>
//               </h2>
//               <p className="mt-32 font-montserrat text-[#4D4D4D] text-2xl font-normal">
//                 &nbsp; Hormone, mood, and nutritional support that <br />{" "}
//                 evolves with you- finally a system that sees the <br /> full
//                 picture.
//               </p>
//               <div className="mt-10.5 space-x-[30px]">
//                 <StartYourRestButton
//                   text={"Start Your Reset"}
//                 ></StartYourRestButton>
//                 <button className=" text-[20px]  py-[13px] px-[31px] rounded-[6px]  cursor-pointer    text-black border-2 border-brandPrimary">
//                   See How It Works
//                 </button>
//                 {/* <button></button> */}
//               </div>
//             </div>
//             {/* Right side section */}
//             {/* image */}
//             <div className="">
//               <figure>
//                 <img
//                   src="/bannerImage.png"
//                   alt="Banner Image"
//                   className=" w-[304px]"
//                 />
//               </figure>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;

// New Code

// import React from "react";
// import bannerImg from "/bannerImage.png"; // Update the path to your image

// const Banner = () => {
//   return (
//     <div className="bg-gradient-to-r from-[#fefefe] to-[#f3f8ef] py-16 px-4 sm:px-6 lg:px-20">
//       <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
//         {/* Text Content */}
//         <div className="lg:w-1/2 text-center lg:text-left">
//           <h2 className="text-[3.3rem] sm:text-[4rem] md:text-[4.2rem] font-extrabold leading-tight text-black relative">
//             <span className="absolute -z-10 top-0 left-0 text-[4rem] sm:text-[5rem] md:text-[6rem] font-bold text-[#d8e6d3] opacity-70 hidden sm:block">
//               YOUR BODY’S BEEN TALKING
//             </span>
//             <span className="block">
//               YOUR BODY'S BEEN TALKING. FENYX <br />
//               <span className="bg-[#d4e6c1] px-1">HELPS YOU LISTEN.</span>
//             </span>
//           </h2>

//           <p className="mt-6 text-gray-700 text-base md:text-lg">
//             Hormone, mood, and nutritional support that evolves with you –
//             finally a system that sees the full picture.
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
//             <button className="bg-[#94b79e] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#7fa98b] transition">
//               Start Your Reset
//             </button>
//             <button className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition">
//               See How It Works
//             </button>
//           </div>
//         </div>

//         {/* Image Section */}
//         <div className="lg:w-1/2 flex justify-center">
//           <img
//             src={bannerImg}
//             alt="Banner Woman Illustration"
//             className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

//Updated
import { BsListNested } from "react-icons/bs";
import StartYourRestButton from "../../components/shared/Buttons/StartYourRestButton";

const Home = () => {
  return (
    <div className="bg-[#FDFAF5]">
      <div className="container px-5 mx-auto pt-[100px] md:pt-[154px] pb-[44px]">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-7/12 relative">
            {/* Outlined Background Text */}
            <h2
              className="uppercase font-extrabold text-[24px] sm:text-[40px] md:text-[60px] text-transparent font-playfair-display -z-10 
  [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#a6c2b3] whitespace-nowrap overflow-hidden"
            >
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
                <span className="absolute left-0 bottom-1 h-[20px] sm:h-[23px] w-full bg-brandSecondary -z-10"></span>
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
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-[30px]">
              <StartYourRestButton text="Start Your Reset" />
              <button className="text-[16px] sm:text-[18px] py-[12px] px-[28px] rounded-[6px] border-2 border-brandPrimary text-black hover:bg-gray-100 transition">
                See How It Works
              </button>
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

export default Home;
