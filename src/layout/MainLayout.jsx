import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="font-inter">
      <Navbar></Navbar>
      <div className="mt-[122px] h-[calc(100vh-102px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
