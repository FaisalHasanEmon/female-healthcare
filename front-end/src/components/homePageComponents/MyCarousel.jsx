import React, { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MyCarousel = ({ data, reverse = false, from = "none" }) => {
  const [showImage, setShowImage] = React.useState("");
  const carouselRef = useRef(null);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1456 }, items: 3 },
    tablet: { breakpoint: { max: 1456, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };
  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Manually move the carousel left every X seconds if reverse is true
  useEffect(() => {
    if (reverse && carouselRef.current) {
      const interval = setInterval(() => {
        carouselRef.current.previous(); // move to previous instead of next
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [reverse]);
  // Show Modal Function
  const handleCardClick = (contentImage) => {
    setShowImage(contentImage);
    document.getElementById("my_modal_4").showModal();
  };

  return (
    <div className={`${reverse ? "direction-rtl" : ""} py-5`}>
      {from === "smartHealth" && (
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite
          autoPlay={!reverse} // disable default autoplay for reversed one
          autoPlaySpeed={2500}
          draggable
          swipeable
          arrows={false}
          pauseOnHover
          containerClass="carousel-container"
          itemClass="px-2"
          keyBoardControl={true}
        >
          {(reverse ? [...data].reverse() : data).map((item) => (
            <div
              key={item?.content_id}
              className="w-[350px]  lg:w-[470px] p-5  mx-auto rounded-2xl flex flex-col lg:flex-row   justify-center items-center gap-2.5 bg-gradient-to-l from-brandPrimary to-brandSecondary "
            >
              <figure className="lg:w-5/12 flex justify-center items-center  overflow-hidden ">
                <img
                  src={item?.card_image}
                  className="rounded-lg cursor-pointer"
                  alt="Card Content"
                  onClick={() => handleCardClick(item?.modal_image)}
                />
              </figure>
              <div className="lg:w-7/12 h-40">
                <h3 className="text-[12px] font-medium text-black">
                  {item?.title}
                </h3>
                <p className="font-normal text-[12px] text-[#666666] ml-[5px] mt-2.5">
                  {item?.blog}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      )}
      {from === "testimonials" && (
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite
          autoPlay={!reverse} // disable default autoplay for reversed one
          autoPlaySpeed={2500}
          draggable
          swipeable
          arrows={false}
          pauseOnHover
          containerClass="carousel-container"
          itemClass="px-2"
          keyBoardControl={true}
        >
          {(reverse ? [...data].reverse() : data).map((item) => (
            <div
              key={item?.id}
              className="bg-white  flex flex-col justify-center items-center h-[200px]  ml-10 backdrop-blur-3xl w-[350px] rounded-lg p-6 border border-brandSecondary "
            >
              <div className="text-left space-y-3 w-full h-full">
                {/* item Name */}
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {item?.name}
                </h3>

                {/* Comment */}
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {item?.comment}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex space-x-1 w-full">
                {renderStars(item?.rating)}
              </div>
            </div>
          ))}
        </Carousel>
      )}
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
    </div>
  );
};

export default MyCarousel;
