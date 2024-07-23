import { useRoutes, createBrowserRouter } from "react-router-dom";
import Layout from "@/views/layout";
import Home from "@/views/homepage";
import Domain from "@/views/domain";
import { routerType } from "./interface";

const routerMap: routerType[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home />, meta: { title: "首页", key: "home" } },
      {
        path: "/domain",
        element: <Domain />,
        meta: { title: "域名", key: "domain" },
      },
    ],
  },
];
const Router = createBrowserRouter(routerMap);
export { Router, routerMap };
