import { lazy, Suspense } from "react";
import { useRoutes, createHashRouter } from "react-router-dom";
import Layout from "@/views/layout";
import { routerType } from "./interface";

// 使用 React.lazy 懒加载 Serves 和 Domain 组件
const LazyServes = lazy(() => import("@/views/serves"));
const LazyDomain = lazy(() => import("@/views/domain"));

const routerMap: routerType[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/serves",
        element: (
          // 使用 Suspense 包裹懒加载的 Serves 组件
          <Suspense fallback={<div>Loading Serves...</div>}>
            <LazyServes />
          </Suspense>
        ),
        meta: { title: "Menu.Server", key: "/serves" },
      },
      {
        path: "/domain",
        element: (
          // 使用 Suspense 包裹懒加载的 Domain 组件
          <Suspense fallback={<div>Loading Domain...</div>}>
            <LazyDomain />
          </Suspense>
        ),
        meta: { title: "Menu.Domain", key: "/domain" },
      },
    ],
  },
];

const Router = createHashRouter(routerMap);
export { Router, routerMap };
