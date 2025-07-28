import React from "react";
import BoxHeading from "./shared/BoxHeading";

const ReclaimHowYouFeel = () => {
  const cardData = [
    {
      id: "01",
      title: "Tell FENYX What’s Going On",
      body: "Answer a few quick questions about your mood, energy, cycle, and cravings. FENYX starts to learn what your body’s really asking for.",
    },
    {
      id: "02",
      title: "Get Instant Insights That Actually Make Sense",
      body: "FENYX translates your data into personalized guidance — not fluff. Think real science-backed suggestions that align with your hormones, habits, and healing.",
    },
    {
      id: "03",
      title: "Reset with Confidence (Not Guesswork)",
      body: "Track your shifts, feel supported, and take action with tools that evolve with you. Your reset begins — on your terms.",
    },
    {
      id: "04",
      title: "Grow With FENYX",
      body: "As you keep logging and learning, FENYX evolves with you — offering smarter insights, deeper support, and new layers of guidance each cycle.",
    },
  ];
  return (
    <section>
      <div className="container mx-auto px-5 py-14">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Smart Health Reads for Real-Life Bodies
          </h2>
          <div className="mb-[83px] ">
            <BoxHeading text="How It Works" />
          </div>
          {/* cards */}
          <div className="flex flex-col justify-center items-center lg:flex-row   lg:gap-space-y-4  lg:p-4 ">
            {cardData?.map((data) => (
              <div
                key={data?.id}
                className="flex flex-col lg:flex-row justify-center items-center"
              >
                <div className="p-3  lg:p-3 border-2 border-brandPrimary shadow-brandPrimary shadow-2xl rounded-4xl  w-[256px] h-[256px] flex flex-col justify-start items-center gap-3 ">
                  {/* Number */}
                  <div className="w-[60px] h-[60px] bold flex justify-center items-center rounded-full border border-brandPrimary">
                    <p className="font-semibold text-xl text-textGray ">
                      {data?.id}
                    </p>
                  </div>
                  {/* Title */}
                  <p className="textarea-sm text-center font-extrabold text-textGray grow-0">
                    {data?.title}
                  </p>
                  {/* Divider */}
                  <div className="w-2/6 h-[2px] bg-brandPrimary"></div>

                  {/* Body */}
                  <p className="textarea-sm  text-center font-normal text-black">
                    {data?.body}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  hidden={data?.id === "04" ? true : false}
                  className={` p-3 flex items-center justify-center md:justify-start  mt-2 text-brandPrimary text-5xl  font-semibold rotate-90 lg:rotate-0`}
                >
                  &rarr; {/* Unicode right arrow */}
                </div>
                {/* Arrow */}
              </div>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ReclaimHowYouFeel;
