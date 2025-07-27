import React from "react";
import Banner from "../../components/homePageComponents/Banner";
import SmartSupport from "../../components/homePageComponents/SmartSupport";
import ReclaimHowYouFeel from "../../components/homePageComponents/ReclaimHowYouFeel";
import SmartHealth from "../../components/homePageComponents/SmartHealth";
import Testimonials from "../../components/shared/Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <SmartSupport />
      <ReclaimHowYouFeel />
      <SmartHealth />
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
