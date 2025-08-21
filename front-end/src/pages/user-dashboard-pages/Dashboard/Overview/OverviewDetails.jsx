import { useParams } from "react-router-dom";

const OverviewDetails = () => {
  const param = useParams();
  console.log(param.id);
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
  const overviewDetails = overview.find((item) => item.id == param.id);

  return (
    <div className="my-10 bg-brandPrimary/44 rounded-3xl">
      <div
        className="w-full bg-cover bg-center h-64 bg-no-repeat rounded-3xl flex flex-col justify-center items-center text-white gap-[30px]"
        style={{ backgroundImage: `url(${overviewDetails?.image})` }}
      >
        <p className="text-center text-5xl">{overviewDetails?.title}</p>
      </div>
      <div className="p-4">
        <p className="text-[20px] font-medium mb-5">Today's Symptom Score</p>
        <p>{overviewDetails?.text}</p>
      </div>
    </div>
  );
};

export default OverviewDetails;
