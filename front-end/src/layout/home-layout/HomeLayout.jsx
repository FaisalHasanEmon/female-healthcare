import { Outlet } from "react-router-dom";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";

const HomeLayout = () => {
  return (
    <div className="font-inter">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-228px)]">
        <Outlet></Outlet>{" "}
      </div>
      <Footer></Footer>
    </div>
  );
};
export default HomeLayout;
