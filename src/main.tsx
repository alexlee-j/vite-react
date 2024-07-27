import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { Router } from "@/routes/index";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
