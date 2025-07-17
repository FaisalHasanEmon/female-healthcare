import StartYourRestButton from "../../components/shared/Buttons/StartYourRestButton";

const Home = () => {
  return (
    <>
      <div className="border border-black  px-[60px]">
        <div className="flex">
          <div className="border border-red-500 w-[60%]">
            <h2 className="uppercase">fenyx femme</h2>
            <h2 className="uppercase">
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
              <button></button>
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
