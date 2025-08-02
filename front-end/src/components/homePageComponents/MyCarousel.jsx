// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const MyCarousel = ({ data, reverse = false }) => {
//   const responsive = {
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
//     tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
//     mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
//   };

//   return (
//     <div className={`${reverse ? "direction-rtl" : ""} py-6`}>
//       <Carousel
//         responsive={responsive}
//         infinite
//         autoPlay
//         autoPlaySpeed={2000}
//         draggable
//         swipeable
//         arrows={false}
//         pauseOnHover
//         renderButtonGroupOutside
//         renderDotsOutside
//         containerClass="carousel-container"
//         itemClass="px-2"
//       >
//         {(reverse ? [...data].reverse() : data).map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4 text-center">
//               <h3 className="text-base font-semibold">{item.title}</h3>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default MyCarousel;

import React, { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MyCarousel = ({ data, reverse = false, from = "none" }) => {
  const [showImage, setShowImage] = React.useState("");
  const carouselRef = useRef(null);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
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
      {from !== "none" && (
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
              className="w-[350px]  md:w-[570px] p-5 md:p-6 mx-auto rounded-2xl flex flex-col md:flex-row   justify-center items-center gap-2.5 bg-gradient-to-l from-brandPrimary to-brandSecondary "
            >
              <figure className="md:w-1/2 md:h-[225px] flex justify-center items-center  overflow-hidden ">
                <img
                  src={item?.card_image}
                  className="rounded-lg cursor-pointer"
                  alt="Card Content"
                  onClick={() => handleCardClick(item?.modal_image)}
                />
              </figure>
              <div className="md:w-1/2 h-40">
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
