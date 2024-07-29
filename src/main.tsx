import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { Router } from "@/routes/index";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "@/language";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
