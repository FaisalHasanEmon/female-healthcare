import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import AIChatBot from "../pages/ai-chatbot/AIChatBot";
import Testimonials from "../pages/testimonials/Testimonials";
import About from "../pages/about/About";
import FenyxLibrary from "../pages/fenyx-library/FenyxLibrary";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ContactUs from "../pages/contact-us/ContactUs";
import SignUp from "../pages/authentication/signup/SignUp";
import Login from "../pages/authentication/login/Login";

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
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
