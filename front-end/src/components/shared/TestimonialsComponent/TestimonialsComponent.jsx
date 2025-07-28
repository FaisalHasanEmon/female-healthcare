import React from "react";
import Marquee from "react-fast-marquee";

const TestimonialsComponent = () => {
  const commentsOfUsers = [
    {
      id: 1,
      name: "Emily Carter",
      comment: "Helped me track everything accurately. So useful!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sophia Patel",
      comment: "Nice UI and timely reminders. Love it!",
      rating: 4,
    },
    {
      id: 3,
      name: "Ava Thompson",
      comment: "Period predictions are spot on!",
      rating: 5,
    },
    {
      id: 4,
      name: "Isabella Nguyen",
      comment: "Would be better with mood tracking.",
      rating: 3,
    },
    {
      id: 5,
      name: "Mia Johnson",
      comment: "Reliable and easy to use.",
      rating: 5,
    },
    {
      id: 6,
      name: "Charlotte Kim",
      comment: "I wish it had more fertility insights.",
      rating: 4,
    },
    {
      id: 7,
      name: "Amelia Brown",
      comment: "Loved the water intake and symptom tracking!",
      rating: 5,
    },
    {
      id: 8,
      name: "Harper Wilson",
      comment: "Notifications are helpful, but sometimes late.",
      rating: 4,
    },
    {
      id: 9,
      name: "Evelyn Davis",
      comment: "Very insightful data visualization.",
      rating: 5,
    },
    {
      id: 10,
      name: "Abigail Smith",
      comment: "Helped me understand my cycle better.",
      rating: 5,
    },
  ];

  // Ratings Function
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

  return (
    <section className="my-10 md:my-20 pb-10">
      <div>
        {/* Header */}
        <div className="text-center mb-16 px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by women like you.
          </h2>
        </div>

        {/* Testimonials */}
        <div className="mt-2">
          <Marquee direction={"right"} speed={30}>
            {commentsOfUsers.map((user) => (
              <div
                key={user?.id}
                className="bg-white  flex flex-col justify-center items-center h-[200px]  ml-10 backdrop-blur-3xl w-[350px] rounded-lg p-6 border border-brandSecondary "
              >
                <div className="text-left space-y-3 w-full h-full">
                  {/* User Name */}
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">
                    {user?.name}
                  </h3>

                  {/* Comment */}
                  <p className="text-gray-700 text-base leading-relaxed mb-4">
                    {user?.comment}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex space-x-1 w-full">
                  {renderStars(user?.rating)}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsComponent;
