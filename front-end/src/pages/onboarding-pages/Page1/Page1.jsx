import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// first form
const Page1 = () => {
  const [period, setPeriod] = useState(false);
  const [cycle, setCycle] = useState({});
  const navigate = useNavigate();
  
  // get cycle
  useEffect(() => {
    const getCycle = localStorage.getItem("cycle");
    if (getCycle && Object.keys(getCycle).length > 0) {
      setCycle(JSON.parse(getCycle));
    }
  }, []);

  
  //set cycle in localstorage
  const handleSubmit = (event) => {
    event.preventDefault();
    const healthStatus = event.target.healthStatus.value;
    let cycleData = {};

    // check input value and set data field 
    if (healthStatus === "periods"){
      const date = event.target.date.value;
      const cycleDay = event.target.cycleDay.value;
      const periodDuration = event.target.periodDuration.value;
       cycleData = {isPeriod: true,isMenopause: false,ishormoneTherapy: false}
       cycleData.period={date, cycleDay, periodDuration };
    } else if(healthStatus === "menopause") {
      cycleData = { isPeriod: false,isMenopause: true, ishormoneTherapy: false};
    }else if(healthStatus === "hormoneTherapy"){
      cycleData ={ isPeriod: false, isMenopause: false, ishormoneTherapy: true };
    }
    console.log(cycleData);
    // set data in localStorage 
    if (Object.keys(cycleData).length > 0) {
      localStorage.setItem("cycle", JSON.stringify(cycleData));
      navigate("/onboarding/page2");
    }
  };

  // rander ui
  return (
    <div className="text-center flex flex-col gap-10 w-9/12 md:w-6/12">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair-display">
        Tell us about your cycle
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5">
        <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center cursor-pointer">
          <span className="font-montserrat ">Do you have periods?</span>
          <input
            onChange={()=>setPeriod(true)}
            type="radio"
            className=""
            name="healthStatus"
            value="periods"
            checked={cycle.isPeriod}
          />
        </label>
        <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center cursor-pointer">
          <span className="font-montserrat ">Are you in menopause?</span>
          <input
          onChange={()=>setPeriod(false)}
            type="radio"
            className=""
            name="healthStatus"
            value="menopause"
            checked={cycle.isMenopause}
          />
        </label>
        <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center cursor-pointer">
          <span className="font-montserrat ">Are you on hormone therapy?</span>
          <input
           onChange={()=>setPeriod(false)}
            type="radio"
            className=""
            name="healthStatus"
            value="hormoneTherapy"
            checked={cycle.ishormoneTherapy}
          />
        </label>
        <div
          className={`flex flex-col gap-3 md:gap-5 ${
            period ? "block" : "hidden"
          }`}
        >
          <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center">
            <span className="font-montserrat ">Last period start date</span>
            <input
              type="date"
              className="input input-sm outline-1 cursor-pointer px-1 outline-brandPrimary rounded-sm"
            />
          </label>
          <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center">
            <span className="font-montserrat ">Cycle length (Days)</span>
            <input
              type="number"
              className="outline-1 cursor-pointer outline-brandPrimary px-1 rounded-sm"
              defaultValue={28}
              name="cycleDay"
            />
          </label>
          <label className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center">
            <span className="font-montserrat ">Period duration (Days)</span>
            <input
              type="number"
              className="outline-1 cursor-pointer px-1 outline-brandPrimary rounded-sm"
              defaultValue={7}
              name="periodDuration"
            />
          </label>
        </div>
        <div>
        <button
          type="submit"
          className=" btn bg-brandPrimary text-center px-5 md:px-40 hover:bg-[#7f9e90]"
        >
          Continue
        </button>
      </div>
      </form>
    </div>
  );
};

export default Page1;

//--------------------- from options data for page1-----------------------------

// const options = [
//   {
//     id: 1,
//     title: "Do you have periods?",
//     value: "periods",
//   },
//   {
//     id: 2,
//     title: "Are you in menopause?",
//     value: "menopause",
//   },
//   {
//     id: 3,
//     title: "Are you on hormone therapy?",
//     value: "hormoneTherapy",
//   },
// ];
