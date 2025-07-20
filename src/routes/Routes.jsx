import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import AIChatBot from "../pages/ai-chatbot/AIChatBot";
import Testimonials from "../pages/testimonials/Testimonials";
import About from "../pages/about/About";
import FenyxLibrary from "../pages/fenyx-library/FenyxLibrary";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ContactUs from "../pages/contact-us/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/ai-chatbot",
        element: <AIChatBot></AIChatBot>,
      },
      {
        path: "/fenyx-library",
        element: <FenyxLibrary></FenyxLibrary>,
      },
      {
        path: "/testimonials",
        element: <Testimonials></Testimonials>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
]);

export default router;
