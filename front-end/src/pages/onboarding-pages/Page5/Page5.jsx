import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Page5 = () => {
  const [showtime, setShowtime] = useState(false);

  const navigate = useNavigate();

  // get data from form and set to localStorage
  const handleSubmit = (event) => {
    event.preventDefault();
    const time = event.target.time.value;
    if(showtime){
      localStorage.setItem("time",time);
    }
    navigate("/onboarding/page6");
  };

  // get time on intial loading
  useEffect(()=>{
    const time = localStorage.getItem("time");
    if(time){
      setShowtime(true);
    }
  },[])


  return (
    <div className="text-center flex flex-col gap-10 w-3/4 md:h-2/4">
      {/* title  */}
      <h1 className="text-2xl md:text-xl font-bold font-playfair-display">
        Would you like to set a daily reminder to check in with your body?
      </h1>
      <form
       onSubmit={handleSubmit}
        className="flex flex-col gap-3 md:gap-5"
      >
        {/* option  */}
        <label className="border border-brandPrimary rounded flex justify-between p-1 text-sm md:text-base md:p-3 items-center">
          <span className="font-montserrat text-sm md:text-base">YES</span>
          <input type="radio" onChange={() => setShowtime(true)} className="" name="healthStatus" value="yes" />
        </label>
        <label className="border border-brandPrimary rounded flex justify-between p-1 text-sm md:text-base md:p-3  items-center">
          <span className="font-montserrat text-sm md:text-base">No</span>
          <input type="radio" onChange={() => setShowtime(false)} className="" name="healthStatus" value="no" />
        </label>
        
        {/* navigation  */}
        <div className="mr-auto">
          <button
            type="submit"
            className=" btn bg-brandPrimary px-5 md:px-10 text-sm md:text-base hover:bg-[#7f9e90]"
          >
            Finish up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page5;
