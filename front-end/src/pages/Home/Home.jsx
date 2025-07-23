import { BsListNested } from "react-icons/bs";
import StartYourRestButton from "../../components/shared/Buttons/StartYourRestButton";
// import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="bg-[#FDFAF5]">
        <div className="container px-5 mx-auto pt-[154px] pb-[44px]">
          <div className="flex">
            {/* Left Side Section */}
            <div className="w-[70%]">
              <h2 className="-ml-5 uppercase font-extrabold text-[60px] text-transparent  font-playfair-display -z-10  [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#a6c2b3] ">
                your body's been talking
              </h2>
              <h2 className="-ml-5 absolute top-38.5  text-base-100 uppercase font-extrabold text-[60px]  font-playfair-display text white">
                your body's been talking
              </h2>

              <h2 className="-mt-13 absolute z-50! uppercase font-bold text-[44px]">
                Change to Your Body's Been Talking. FENYX <br />{" "}
                <span className="after:content-[''] after:absolute after:left-0 after:bottom-2 after:h-[23px] after:w-[484px] after:ml-6  after:bg-brandSecondary after:rounded-0 after:-z-50">
                  Helps You Listen.
                </span>
              </h2>
              <p className="mt-32 font-montserrat text-[#4D4D4D] text-2xl font-normal">
                &nbsp; Hormone, mood, and nutritional support that <br />{" "}
                evolves with you- finally a system that sees the <br /> full
                picture.
              </p>
              <div className="mt-10.5 space-x-[30px]">
                <StartYourRestButton
                  text={"Start Your Reset"}
                ></StartYourRestButton>
                <button className=" text-[20px]  py-[13px] px-[31px] rounded-[6px]  cursor-pointer    text-black border-2 border-brandPrimary">
                  See How It Works
                </button>
                {/* <button></button> */}
              </div>
            </div>
            {/* Right side section */}
            {/* image */}
            <div className="">
              <figure>
                <img
                  src="/bannerImage.png"
                  alt="Banner Image"
                  className="w-[304px]"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
