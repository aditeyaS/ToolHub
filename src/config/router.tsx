import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import ToolList from "../pages/ToolList";
import Error from "../pages/Error";
import Stopwatch from "../pages/Stpowatch";
import Pomodoro from "../pages/Pomodoro";
import ColorVisualizer from "../pages/ColorVisualizer";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/tools",
        children: [
          { path: "", element: <ToolList /> },
          { path: "stopwatch", element: <Stopwatch /> },
          { path: "pomodoro", element: <Pomodoro /> },
          { path: "colorVisualizer", element: <ColorVisualizer /> },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default router;
