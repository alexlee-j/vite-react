import React from "react";
import { Flex, Drawer } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";

const HeaderBar: React.FC = () => {
  return (
    <Flex justify="space-between" align="center">
      <div>
        <CloudOutlined className="icon-style" />
        默默学开发
      </div>
      <div>
        <IconFont name="theme" />
      </div>
    </Flex>
  );
  // return (
  //   <Drawer title="Basic Drawer" placement="right" width={"100%"}>
  //     <p>Some contents...</p>
  //     <p>Some contents...</p>
  //     <p>Some contents...</p>
  //   </Drawer>
  // );
};

export default HeaderBar;
