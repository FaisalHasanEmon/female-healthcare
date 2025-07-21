import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import AIChatBot from "../pages/ai-chatbot/AIChatBot";
import Testimonials from "../pages/testimonials/Testimonials";
import About from "../pages/about/About";
import FenyxLibrary from "../pages/fenyx-library/FenyxLibrary";
import HomeLayout from "../layout/home-layout/HomeLayout";
import ContactUs from "../pages/contact-us/ContactUs";
import SignUp from "../pages/authentication/signup/SignUp";
import Login from "../pages/authentication/login/Login";
import OnBoardingLayout from "../layout/on-boarding-layout/OnBoardingLayout";

const router = createBrowserRouter([
  // Home Layout Paths
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
  // Sign up path
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  // Login path
  {
    path: "/login",
    element: <Login></Login>,
  },
  // Onboarding Layout Paths
  {
    path: "/onboarding",
    element: <OnBoardingLayout></OnBoardingLayout>,
  },
]);

export default router;
