import React, { useEffect } from "react";
import { Flex, Drawer, Switch } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";
import "./headerBar.less";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { changeMode } from "@/redux/modules/themeSlice";

const loadStyle = (href: string) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  head.appendChild(link);
};
const removeStyle = (href: string) => {
  const links = document.querySelectorAll(
    `link[rel=stylesheet][href*="${href}.less"]`
  );
  links.forEach((link) => link.parentNode?.removeChild(link));
};
const ThemeComponent = () => {
  const [open, setOpen] = React.useState(false);
  const darkModeState = useSelector((state: RootState) => state.theme.mode);
  const dispatchDarkMode = useDispatch();

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onchange = (checked: boolean, type: string) => {
    if (checked) {
      if (type === "weak") {
        dispatchDarkMode(changeMode("weak"));
      } else if (type === "gray") {
        dispatchDarkMode(changeMode("gray"));
      } else {
        dispatchDarkMode(changeMode("dark"));
      }
    } else {
      dispatchDarkMode(changeMode("light"));
    }
  };
  useEffect(() => {
    if (darkModeState === "weak") {
      document.getElementById("root")!.style.filter = "invert(100%)";
      removeStyle("theme-default");
      removeStyle("theme-dark");
    } else if (darkModeState === "gray") {
      document.getElementById("root")!.style.filter = "grayscale(100%)";
      removeStyle("theme-default");
      removeStyle("theme-dark");
    } else if (darkModeState === "dark") {
      document.getElementById("root")!.style.filter = "none";
      removeStyle("theme-default");
      loadStyle("/src/styles/theme-dark.less");
    } else {
      document.getElementById("root")!.style.filter = "none";
      // 移除暗黑模式的样式
      removeStyle("theme-dark");
      loadStyle("/src/styles/theme-default.less");
    }
  }, [darkModeState]);

  return (
    <div>
      <IconFont name="theme" onClick={showDrawer} />
      <Drawer title="主题设置" onClose={onClose} open={open}>
        <p className="theme-item">
          暗黑模式
          <Switch
            checked={darkModeState === "dark"}
            onChange={(e) => {
              onchange(e, "dark");
            }}
          ></Switch>
        </p>
        <p className="theme-item">
          色弱模式
          <Switch
            checked={darkModeState === "weak"}
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
            checked={darkModeState === "gray"}
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
