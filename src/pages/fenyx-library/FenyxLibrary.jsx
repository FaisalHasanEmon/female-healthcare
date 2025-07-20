import { Link } from "react-router-dom";

const FenyxLibrary = () => {
  const fenyxLibraryCardsContent = [
    {
      content_id: 1,
      image: "/public/fenyxLibrary/Content-1.png",
      title: "Understanding Your Hormonal Cycle: A Week-by-Week Guide",
      blog: "How does your body’s hormonal pattern change each week? This blog explains it in simple terms—from period to ovulation to the luteal phase—to help you better understand your body and its natural rhythm",
      link: "/",
    },
    {
      content_id: 2,
      image: "/public/fenyxLibrary/Content-2.png",
      title:
        "Mood Swings, Fatigue & Cramps: What Your Symptoms Are Telling You",
      blog: "What do the symptoms you feel each month actually mean? And when are they normal vs. a warning sign? This blog breaks down common symptoms like mood swings, fatigue, and headaches with expert insights.",
      link: "/",
    },
    {
      content_id: 3,
      image: "/public/fenyxLibrary/Content-3.png",
      title: "Understanding Your Hormonal Cycle: A Week-by-Week Guide",
      blog: "How does your body’s hormonal pattern change each week? This blog explains it in simple terms—from period to ovulation to the luteal phase—to help you better understand your body and its natural rhythm",
      link: "/",
    },
    {
      content_id: 4,
      image: "/public/fenyxLibrary/Content-4.png",
      title:
        "Mood Swings, Fatigue & Cramps: What Your Symptoms Are Telling You",
      blog: "What do the symptoms you feel each month actually mean? And when are they normal vs. a warning sign? This blog breaks down common symptoms like mood swings, fatigue, and headaches with expert insights.",
      link: "/",
    },
    {
      content_id: 5,
      image: "/public/fenyxLibrary/Content-5.png",
      title: "Understanding Your Hormonal Cycle: A Week-by-Week Guide",
      blog: "How does your body’s hormonal pattern change each week? This blog explains it in simple terms—from period to ovulation to the luteal phase—to help you better understand your body and its natural rhythm",
      link: "/",
    },
    {
      content_id: 6,
      image: "/public/fenyxLibrary/Content-6.png",
      title:
        "Mood Swings, Fatigue & Cramps: What Your Symptoms Are Telling You",
      blog: "What do the symptoms you feel each month actually mean? And when are they normal vs. a warning sign? This blog breaks down common symptoms like mood swings, fatigue, and headaches with expert insights.",
      link: "/",
    },
    {
      content_id: 7,
      image: "/public/fenyxLibrary/Content-7.png",
      title: "Understanding Your Hormonal Cycle: A Week-by-Week Guide",
      blog: "How does your body’s hormonal pattern change each week? This blog explains it in simple terms—from period to ovulation to the luteal phase—to help you better understand your body and its natural rhythm",
      link: "/",
    },
    {
      content_id: 8,
      image: "/public/fenyxLibrary/Content-8.png",
      title:
        "Mood Swings, Fatigue & Cramps: What Your Symptoms Are Telling You",
      blog: "What do the symptoms you feel each month actually mean? And when are they normal vs. a warning sign? This blog breaks down common symptoms like mood swings, fatigue, and headaches with expert insights.",
      link: "/",
    },
  ];

  return (
    <div className="container mx-auto px-5">
      {/* Heading section Starts */}
      <section className="*:text-center">
        <h1 className="font-bold text-4xl">Welcome to the FENYX Library</h1>
        <p className="font-normal text-[20px] mt-[30px]">
          Real Answers. Real Bodies. Curated hormone & Cycle health insights-
          just like inside the platform
        </p>
      </section>
      {/* Heading section Starts */}
      {/* Cards Section Starts */}
      <section className="mt-[60px] grid md:grid-cols-2 grid-cols-1 *:w-full *:rounded-[12px] gap-5 *:p-6 ">
        {fenyxLibraryCardsContent?.map((cardContent) => (
          <div
            key={cardContent?.content_id}
            className="flex flex-col lg:flex-row  justify-center items-center gap-2.5 bg-gradient-to-l from-brandPrimary to-brandSecondary"
          >
            <figure className="lg:max-w-[256px] ">
              <img
                className="w-full"
                src={cardContent?.image}
                alt="Card Content"
              />
            </figure>
            <div>
              <h3 className="text-[12px] font-medium text-black">
                {cardContent?.title}
              </h3>
              <p className="font-normal text-[12px] text-[#666666] ml-[5px] mt-2.5">
                {cardContent?.blog}
              </p>
              <div className="mt-3">
                <Link
                  to={cardContent?.link}
                  className="ml-[5px] text-[8px] font-normal text-black py-1 px-2 bg-brandSecondary rounded-[50px]"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* Cards Section Starts */}
    </div>
  );
};

export default FenyxLibrary;
