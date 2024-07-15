import React, { useState } from "react";
import { DesktopOutlined, CloudServerOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  link?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label: link ? <Link to={link}>{label}</Link> : label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("服务器", "1", <CloudServerOutlined />, undefined, "/"),
  getItem("域名", "2", <DesktopOutlined />, undefined, "/domain"),
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
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
            defaultSelectedKeys={["1"]}
            selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
          ></Menu>
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
            ©{new Date().getFullYear()} 湘ICP备20014625号-1
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
