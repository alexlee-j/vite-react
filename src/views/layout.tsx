import React, { useEffect, useState } from "react";
import { DesktopOutlined, CloudServerOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routerMap } from "@/routes";
import { routerType, menuType } from "@/routes/interface";

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

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

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

  useEffect(() => {
    const menuRoutes: routerType[] = routerMap[0].children || [];
    const menuItems = createMenu(menuRoutes);
    console.log(menuItems);

    setRouters(menuItems);
  }, []);

  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    setSelectedKeys([key]);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, background: colorBgContainer }} />
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
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadcrumbItems}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
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
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
