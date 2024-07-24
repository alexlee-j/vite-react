import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Synopsis from "./synopsis";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "概要",
    children: <Synopsis />,
  },
  {
    key: "2",
    label: "容器管理",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "域名解析",
    children: "Content of Tab Pane 3",
  },
];

const Serves: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default Serves;
