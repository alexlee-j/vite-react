import React from "react";
import { Flex, Drawer, Switch } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";
import "./headerBar.less";

const ThemeComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [themeType, setThemeType] = React.useState("");
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onchange = (checked: boolean, type: string) => {
    if (checked) {
      if (type === "weak") {
        setThemeType("weak");
        document.getElementById("root")!.style.filter = "invert(100%)";
      } else if (type === "gray") {
        setThemeType("gray");
        document.getElementById("root")!.style.filter = "grayscale(100%)";
      } else {
        // setThemeType("dark");
        // document.getElementById("root")!.style.filter = "none";
        // let head = document.getElementsByTagName("head")[0];
        // let styleDom = document.createElement("style");
        // styleDom.dataset.type = "dark";
        // styleDom.innerHTML = darkTheme;
        // head.appendChild(styleDom);
      }
    } else {
      setThemeType("light");
      document.getElementById("root")!.style.filter = "none";
    }
  };

  return (
    <div>
      <IconFont name="theme" onClick={showDrawer} />
      <Drawer title="主题设置" onClose={onClose} open={open}>
        <p className="theme-item">
          暗黑模式
          <Switch
            checked={themeType === "dark"}
            onChange={(e) => {
              onchange(e, "dark");
            }}
          ></Switch>
        </p>
        <p className="theme-item">
          色弱模式
          <Switch
            checked={themeType === "weak"}
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(e) => {
              onchange(e, "weak");
            }}
          ></Switch>
        </p>
        <p className="theme-item">
          灰色模式
          <Switch
            checked={themeType === "gray"}
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(e) => {
              onchange(e, "gray");
            }}
          ></Switch>
        </p>
      </Drawer>
    </div>
  );
};
const HeaderBar: React.FC = () => {
  return (
    <Flex justify="space-between" align="center" className="header-bar">
      <div>
        <CloudOutlined className="icon-style" />
        默默学开发
      </div>
      <ThemeComponent />
    </Flex>
  );
};

export default HeaderBar;
