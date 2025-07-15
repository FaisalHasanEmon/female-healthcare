import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import AIChatBot from "../pages/ai-chatbot/AIChatBot";
import Testimonials from "../pages/testimonials/Testimonials";
import Blog from "../pages/blog/Blog";
import About from "../pages/about/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/testimonials",
        element: <Testimonials></Testimonials>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
]);

export default router;
