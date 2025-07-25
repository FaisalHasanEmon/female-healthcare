import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";









// first form
const Page1 = () => {

  const [cycle, setCycle] = useState("");
  const navigate = useNavigate();

  // get cycle 
  useEffect(()=>{
    const getCycle = localStorage.getItem("cycle");
    if(getCycle?.length > 0){
      setCycle(getCycle)
    }
  },[])


  // set cycle 
  // useEffect(()=>{
  //    if(cycle?.length > 0){
  //     localStorage.setItem("cycle", cycle);
  //    }
  // },[cycle])

  //set cycle in localstorage
  const handleValues=()=>{
       if(cycle?.length > 0){
      localStorage.setItem("cycle", cycle);
     }
    navigate("/onboarding/page2")
  }



  // rander ui 
  return (
    <div className="text-center flex flex-col gap-10 w-3/4">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair-display">
        Tell us about your cycle
      </h1>
      <form
        onChange={(event) => setCycle(event.target.value)}
        className="flex flex-col gap-3 md:gap-5"
      >
         {/* maped for options */}
        {options.map((data) => (
          <label
            key={data.id}
            className="border border-brandPrimary rounded flex justify-between px-2 py-2 md:p-3 items-center"
          >
            <span className="font-montserrat ">{data?.title}</span>
            <input
              checked={data.value === cycle}
              type="radio"
              className=""
              name="healthStatus"
              value={data?.value}
              onChange={() => {}}
            />
          </label>
        ))}
      </form>

      <div>
        <button
          onClick={handleValues}
          className=" btn bg-brandPrimary text-center px-5 md:px-40 hover:bg-[#7f9e90]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Page1;

//--------------------- from options data for page1-----------------------------

const options = [
  {
    id: 1,
    title: "Do you have periods?",
    value: "periods",
  },
  {
    id: 2,
    title: "Are you in menopause?",
    value: "menopause",
  },
  {
    id: 3,
    title: "Are you on hormone therapy?",
    value: "hormoneTherapy",
  },
];
