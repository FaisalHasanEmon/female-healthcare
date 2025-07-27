import React from "react";
import Banner from "../../components/homePageComponents/Banner";
import SmartSupport from "../../components/homePageComponents/SmartSupport";
import ReclaimHowYouFeel from "../../components/homePageComponents/ReclaimHowYouFeel";
import SmartHealth from "../../components/homePageComponents/SmartHealth";
import TestimonialsComponent from "../../components/shared/TestimonialsComponent/TestimonialsComponent";

const Home = () => {
  return (
    <div>
      {/* Section - 1 : Banner Section */}
      <Banner />
      {/* Section - 2 : YOU DESERVE SMART SUPPORT FOR A COMPLEX SEASON */}
      <SmartSupport />
      {/* Section - 3 :  Smart Health Reads for Real-Life Bodies (The Arrow Part)*/}
      <ReclaimHowYouFeel />
      {/* Section - 4 : Smarter Heath Starts Here Subheading (Right to Left Marquee) */}
      <SmartHealth />
      {/* Section - 5 : Trusted by women like you.(Testimonial Section Left To Right Marquee) */}
      <TestimonialsComponent />
    </div>
  );
};

export default Home;
