import React, { useEffect, useState } from "react";
import { DesktopOutlined, CloudServerOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderBar from "./headerBar";
import { routerMap } from "@/routes";
import { routerType, menuType } from "@/routes/interface";
import SunCalc from "suncalc";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { changeMode } from "@/redux/modules/themeSlice";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [routers, setRouters] = useState<MenuItem[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const breadcrumbNameMap: Record<string, string> = {
    "/": "服务器",
    "/domain": "域名",
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    location.pathname,
  ]);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const times = SunCalc.getTimes(new Date(), 39.9042, 116.4074);
  const dispatchDarkMode = useDispatch();

  const handleDarkTheme = () => {
    if (themeMode == "light") {
      // 在晚上，并且处于白天模式
      if (new Date() > times.sunset || new Date() < times.sunrise) {
        dispatchDarkMode(changeMode("dark"));
      }
    }
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  useEffect(() => {
    // 添加事件监听器
    window.addEventListener("mousemove", handleDarkTheme);
    window.addEventListener("keydown", handleDarkTheme);
    return () => {
      // 移除事件监听器
      window.removeEventListener("mousemove", handleDarkTheme);
      window.removeEventListener("keydown", handleDarkTheme);
    };
  }, [themeMode, dispatchDarkMode]);

  const createMenu = (routeMap: routerType[]): MenuItem[] => {
    return routeMap.map((item) => {
      return {
        key: item.meta?.key || item.path || "",
        icon: item.meta?.icon || null,
        label: item.meta?.title,
        children: item.children ? createMenu(item.children) : undefined,
        disabled: item.meta?.disabled,
      };
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const menuRoutes: routerType[] = routerMap[0].children || [];
    const menuItems = createMenu(menuRoutes);
    console.log(menuItems);

    setRouters(menuItems);
    if (location.pathname === "/") {
      navigate("/serves");
      setSelectedKeys(["/serves"]);
    }
    // 初始化时获取主题
    handleDarkTheme();
  }, []);

  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <HeaderBar />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            triggerSubMenuAction="click"
            selectedKeys={selectedKeys}
            mode="inline"
            items={routers}
            onClick={clickMenu}
          />
        </Sider>
        <Layout className="base-bg">
          <ConfigProvider
            theme={{
              algorithm:
                theme[
                  themeMode === "dark" ? "darkAlgorithm" : "defaultAlgorithm"
                ],
              token: {
                colorPrimary: themeMode === "dark" ? "#1DA57A" : "#1890ff",
                colorBgBase: themeMode === "dark" ? "#141414" : "#fff",
                colorTextBase:
                  themeMode === "dark"
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(0, 0, 0, 0.85)",
              },
              cssVar: true,
            }}
          >
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbItems}
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
                className="content-box"
              >
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              ©{new Date().getFullYear()}
              <a
                href="https://beian.miit.gov.cn/"
                style={{ color: "#495770" }}
                target="_blank"
              >
                湘ICP备20014625号-1
              </a>
            </Footer>
          </ConfigProvider>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
