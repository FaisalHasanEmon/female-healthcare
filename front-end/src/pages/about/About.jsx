import { Link } from "react-router-dom";
import model from "../../../public/aboutPageImages/model.jpg";
import fbIcon from "../../../public/socialMediaLogo/facebook.png";
import instaIcon from "../../../public/socialMediaLogo/instagram.png";
import "./about.css"

const About = () => {
  return (
    <div className="mt-[150px] z-45">
      <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
        <div className="flex flex-col items-center w-10/12 md:w-2/4">
          <img src={model} alt="model" className=" md:h-[400px] md:w-[500px]"/>
          <div className="flex flex-col items-center">
            <div className="my-5 font-inter">
              <p>--Chelsea Krmpotic</p>
              <p>Founder, FENYX FEMME</p>
            </div>
            <div className="flex gap-3">
              <Link to="https://www.instagram.com/" alt="instagram">
                <img src={fbIcon} className="h-5 w-5" alt="facebook" />
              </Link>
              <Link to="https://www.facebook.com/">
                <img src={instaIcon} className="h-5 w-5" alt="instagram" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-10/12 md:w-2/4 flex flex-col gap-5 md:gap-20 ">
          <div className="font-prompt uppercase text-xl md:text-7xl tracking-[5px] font-semibold">
            <h1>
              Why I Created
            </h1>
            <h1 >
              FENYX FEMME
            </h1>
          </div>
          <div className="md:w-[670px] font-inter relative mb-8">
            I'm not here to build just another health tech platform. I'm a women
            who lived the fatigue, the 2AM wakes, the cravings, the confusion-
            and decided it was time for something better. FENYX FEMME was born
            from that moment. As a certified holistic nutritionist, and hormone
            health practitioner in training, I've blended real-life experiences
            with science-backed tools to create something powerful-not just for
            me, but for us. Because this isn't abut one story. It's about all of
            us, learning to tune in, track what matters, and make the
            micro-shifts that help us thrive. We're not here to hustle through
            burnout. We're here to rise from it- together.
            <p className="bar"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
