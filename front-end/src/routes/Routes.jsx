import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
// import AIChatBot from "../pages/ai-chatbot/AIChatBot";
import Testimonials from "../pages/testimonials/Testimonials";
import About from "../pages/about/About";
import FenyxLibrary from "../pages/fenyx-library/FenyxLibrary";
import HomeLayout from "../layout/home-layout/HomeLayout";
import ContactUs from "../pages/contact-us/ContactUs";
import SignUp from "../pages/authentication/signup/SignUp";
import Login from "../pages/authentication/login/Login";
import OnBoardingLayout from "../layout/on-boarding-layout/OnBoardingLayout";
import OnboardingHome from "../pages/onboarding-pages/OnboardingHome/OnboardingHome";
import Page1 from "../pages/onboarding-pages/Page1/Page1";
import Page2 from "../pages/onboarding-pages/Page2/Page2";
import Page3 from "../pages/onboarding-pages/Page3/Page3";
import Page4 from "../pages/onboarding-pages/Page4/Page4";
import Page5 from "../pages/onboarding-pages/Page5/Page5";
import Page6 from "../pages/onboarding-pages/Page6/Page6";
import ResetPassword from "../pages/authentication/reset-password/ResetPassword";
import UserDashboard from "../layout/user-dashboard-layout/DashboardLayout";
import StartNewSession from "../pages/user-dashboard-pages/StartNewSession/StartNewSession";
import ModeTracker from "../pages/user-dashboard-pages/ModeTracker/ModeTracker";
import Settings from "../pages/user-dashboard-pages/Settings/Settings";
import Dashboard from "../pages/user-dashboard-pages/Dashboard/Dashboard";

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
      // {
      //   path: "/ai-chatbot",
      //   element: <AIChatBot></AIChatBot>,
      // },
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
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  // Onboarding Layout Paths
  {
    path: "/onboarding",
    element: <OnBoardingLayout />,
    children: [
      {
        path: "/onboarding",
        element: <OnboardingHome />,
      },
      {
        path: "/onboarding/page1",
        element: <Page1 />,
      },
      {
        path: "/onboarding/page2",
        element: <Page2 />,
      },
      {
        path: "/onboarding/page3",
        element: <Page3 />,
      },
      {
        path: "/onboarding/page4",
        element: <Page4 />,
      },
      {
        path: "/onboarding/page5",
        element: <Page5 />,
      },
      {
        path: "/onboarding/page6",
        element: <Page6 />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <UserDashboard></UserDashboard>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/new-session",
        element: <StartNewSession></StartNewSession>,
      },
      { path: "/dashboard/mode-tracker", element: <ModeTracker></ModeTracker> },
      { path: "/dashboard/settings", element: <Settings></Settings> },
    ],
  },
]);

export default router;
