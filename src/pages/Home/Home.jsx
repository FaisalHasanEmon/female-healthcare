import StartYourRestButton from "../../components/shared/Buttons/StartYourRestButton";
// import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="border border-black container px-5 mx-auto">
        <div className="flex">
          <div className="border border-red-500 ">
            <h2 className="uppercase font-extrabold text-[60px] text-transparent  font-playfair-display  [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#a6c2b3] ">
              your body's been talking
            </h2>
            <h2 className="absolute top-31  text-base-100 uppercase font-extrabold text-[60px]  font-playfair-display text white">
              your body's been talking
            </h2>

            <h2 className="uppercase ">
              change to your body's been <br /> talking. fenyx helps you listen
            </h2>
            <p>
              Hormone, mood, and nutritional support that evolves with you-
              finally a system that sees the full picture.
            </p>
            <div>
              <StartYourRestButton
                text={"Start Your Reset"}
              ></StartYourRestButton>
              <StartYourRestButton
                text={"Start Your Reset"}
              ></StartYourRestButton>
              {/* <button></button> */}
            </div>
          </div>
          {/* image */}
          <div className="border border-green-500"></div>
        </div>
      </div>
    </>
  );
};
export default Home;
