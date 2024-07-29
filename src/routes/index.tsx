import { useRoutes, createHashRouter } from "react-router-dom";
import Layout from "@/views/layout";
import Serves from "@/views/serves";
import Domain from "@/views/domain";
import { routerType } from "./interface";

const routerMap: routerType[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/serves",
        element: <Serves />,
        meta: { title: "Menu.Server", key: "/serves" },
      },
      {
        path: "/domain",
        element: <Domain />,
        meta: { title: "Menu.Domain", key: "/domain" },
      },
    ],
  },
];
const Router = createHashRouter(routerMap);
export { Router, routerMap };
