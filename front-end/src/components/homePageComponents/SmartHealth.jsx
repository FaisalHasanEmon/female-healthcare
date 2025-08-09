import React, { useState } from "react";
import BoxHeading from "./shared/BoxHeading";
// import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import MyCarousel from "./MyCarousel";

const SmartHealth = () => {
  // Show Image Use State
  const [showImage, setShowImage] = useState("");
  // const [isHovered, setIsHovered] = useState(false);

  // Card Contents Information
  const fenyxLibraryCardsContent = [
    {
      content_id: 1,
      modal_image: "/smartHealth/card-1.jpg",
      card_image: "/smartHealth/img-1.jpg",
      title: "Understanding Your Hormonal Cycle: A Week-by-Week Guide",
      blog: "How does your body’s hormonal pattern change each week? This blog explains it in simple terms—from period to ovulation to the luteal phase—to help you better understand your body and its natural rhythm",
      link: "/",
    },
    {
      content_id: 2,
      modal_image: "/smartHealth/card-2.jpg",
      card_image: "/smartHealth/img-2.jpg",
      title:
        "Mood Swings, Fatigue & Cramps: What Your Symptoms Are Telling You",
      blog: "What do the symptoms you feel each month actually mean? And when are they normal vs. a warning sign? This blog breaks down common symptoms like mood swings, fatigue, and headaches with expert insights.",
      link: "/",
    },
    {
      content_id: 3,
      modal_image: "/smartHealth/card-3.jpg",
      card_image: "/smartHealth/img-3.jpg",
      title: "Understanding Your Hormonal Cycle: A Week-by-Week Guide",
      blog: "How does your body’s hormonal pattern change each week? This blog explains it in simple terms—from period to ovulation to the luteal phase—to help you better understand your body and its natural rhythm",
      link: "/",
    },
    {
      content_id: 4,
      modal_image: "/smartHealth/card-4.jpg",
      card_image: "/smartHealth/img-4.jpg",
      title:
        "Mood Swings, Fatigue & Cramps: What Your Symptoms Are Telling You",
      blog: "What do the symptoms you feel each month actually mean? And when are they normal vs. a warning sign? This blog breaks down common symptoms like mood swings, fatigue, and headaches with expert insights.",
      link: "/",
    },
  ];

  // Show Modal Function
  const handleCardClick = (contentImage) => {
    setShowImage(contentImage);
    document.getElementById("my_modal_4").showModal();
  };
  return (
    <section>
      <div className=" py-14 mt-10">
        {/* Box heading and Title Starts */}
        <div className="container mx-auto px-5 text-center space-y-[61px]">
          <div>
            <div
              className={`flex w-[200px] justify-start  items-center gap-5 mx-auto  py-[7px] px-[14px] border-2 border-brandPrimary rounded-[6px]`}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-brandSecondary"></div>
              <p className="text-[20px]">FENYX Library</p>
            </div>
          </div>
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Smarter Heath Starts Here Subheading
            </h2>
            <p className="text-xl lg:text-2xl font-semibold text-textGray">
              Expert-Backed Hormone & Cycle insights, <br /> All in One Place
            </p>
          </div>
        </div>
        {/* Box heading and Title Ends */}
        {/* Carousels Section Starts */}
        <div className="mt-10 md:mt-20">
          <MyCarousel data={fenyxLibraryCardsContent} from={"smartHealth"} />
        </div>
        {/* Carousels Section Ends */}
      </div>
      {/* Modal Of Selected Image*/}
      <dialog id="my_modal_4" className="modal ">
        <div className="modal-box w-11/12 max-h-[95%] max-w-5xl bg-brandPrimary overflow-x-hidden">
          <img
            src={`${showImage}`}
            className="w-full h-full object-top rounded-lg"
          />
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="btn w-full bg-brandSecondary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default SmartHealth;
