import { createBrowserRouter } from "react-router-dom";
import Layout from "@/views/layout";
import Home from "@/views/homepage";
import Domain from "@/views/domain";

const router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/domain", element: <Domain /> },
    ],
  },
];
const routers = createBrowserRouter(router);

export default routers;
