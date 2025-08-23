import React from "react";
import { Link } from "react-router-dom";

const Overview = () => {
  const overview = [
    {
      id: 1,
      title: "Low",
      image: "/overview/first.jpg",
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis enim esse eos fugit laudantium consequuntur amet nam, ullam dolores ad? Facilis beatae repudiandae sint asperiores laboriosam magnam vero officiis! Accusamus iusto quo ipsum assumenda quidem placeat labore natus. Veritatis corrupti voluptatibus commodi similique sunt voluptatum ullam vero, quam iste, vel autem laborum eveniet, aperiam error minus totam et non dolorem.",
    },
    {
      id: 2,
      title: "Suggested Tips",
      image: "/overview/second.jpg",
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis enim esse eos fugit laudantium consequuntur amet nam, ullam dolores ad? Facilis beatae repudiandae sint asperiores laboriosam magnam vero officiis! Accusamus iusto quo ipsum assumenda quidem placeat labore natus. Veritatis corrupti voluptatibus commodi similique sunt voluptatum ullam vero, quam iste, vel autem laborum eveniet, aperiam error minus totam et non dolorem.",
    },
    {
      id: 3,
      title: "How to Deal with Cold Flashes",
      image: "/overview/third.jpg",
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis enim esse eos fugit laudantium consequuntur amet nam, ullam dolores ad? Facilis beatae repudiandae sint asperiores laboriosam magnam vero officiis! Accusamus iusto quo ipsum assumenda quidem placeat labore natus. Veritatis corrupti voluptatibus commodi similique sunt voluptatum ullam vero, quam iste, vel autem laborum eveniet, aperiam error minus totam et non dolorem.",
    },
  ];
  const check = ["low", "medium", "high"];
  return (
    <div className="my-10">
      {overview?.map((content) => (
        <div key={content?.id}>
          {check.includes(content.title.toLowerCase()) ? (
            <div
              className="w-full bg-cover bg-center h-64 bg-no-repeat rounded-3xl flex flex-col justify-center items-center text-white gap-[30px]"
              style={{ backgroundImage: `url(${content?.image})` }}
            >
              <p className="text-center  text-[20px]">TODAY'S SYMPTOM SCORE</p>
              <p className="text-center text-5xl">{content?.title}</p>
            </div>
          ) : (
            <Link to={`/dashboard/overview/${content?.id}`}>
              <div className="mt-12 text-5xl space-y-5">
                <h2>{content?.title}</h2>
                <div
                  className="w-full bg-cover bg-center h-64 bg-no-repeat rounded-3xl flex flex-col justify-center items-center text-white gap-[30px]"
                  style={{ backgroundImage: `url(${content?.image})` }}
                ></div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Overview;
