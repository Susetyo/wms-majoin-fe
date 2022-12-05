import {
  RightOutlined,
  LeftOutlined,
  UserOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React, { ReactNode, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import useLoginStore from "@/pages/login/store";
import useModalStore from "../store/ModalStore";
import ModalConfirmLogout from "./ModalConfirmLogout";
import BottomUser from "./BottomUser";

const { Sider, Content } = Layout;

const LayoutBased: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, role } = useLoginStore((state) => state);
  const { modal } = useModalStore((state) => state);
  const { pathname } = location;
  const [collapsed, setCollapsed] = useState(false);

  const onClickMenu = ({ key }: MenuInfo) => {
    switch (key) {
      case "/barang":
        navigate("/barang");
        break;
      case "/incoming":
        navigate("/incoming");
        break;
      case "/monitoring":
        navigate("/monitoring");
        break;
      default:
        navigate("/outgoing");
        break;
    }
  };

  const items = useMemo(() => {
    console.log(role.toLocaleLowerCase());
    switch (role.toLocaleLowerCase()) {
      case "admin_i":
        return [
          {
            key: "/incoming",
            icon: <VerticalAlignBottomOutlined />,
            label: "Incoming",
          },
        ];
      case "admin_b":
        return [
          {
            key: "/barang",
            icon: <UserOutlined />,
            label: "Barang",
          },
        ];
      case "admin_bm":
        return [
          {
            key: "/barang",
            icon: <UserOutlined />,
            label: "Barang",
          },
          {
            key: "/monitoring",
            icon: <PieChartOutlined />,
            label: "Monitoring",
          },
        ];
      case "admin_om":
        return [
          {
            key: "/outgoing",
            icon: <VerticalAlignTopOutlined />,
            label: "Outgoing",
          },
          {
            key: "/monitoring",
            icon: <PieChartOutlined />,
            label: "Monitoring",
          },
        ];
      case "admin_o":
        return [
          {
            key: "/outgoing",
            icon: <VerticalAlignTopOutlined />,
            label: "Outgoing",
          },
        ];
      case "super_admin":
        return [
          {
            key: "/barang",
            icon: <UserOutlined />,
            label: "Barang",
          },
          {
            key: "/incoming",
            icon: <VerticalAlignBottomOutlined />,
            label: "Incoming",
          },
          {
            key: "/outgoing",
            icon: <VerticalAlignTopOutlined />,
            label: "Outgoing",
          },
          {
            key: "/monitoring",
            icon: <PieChartOutlined />,
            label: "Monitoring",
          },
        ];
      default:
        return [];
    }
  }, [username]);

  return (
    <Layout className="h-screen">
      <Sider
        className="bg-white"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {collapsed ? <Logo /> : <TextLogo />}
        <div className="relative">
          <Menu
            mode="inline"
            defaultSelectedKeys={["/barang"]}
            selectedKeys={[pathname]}
            items={items}
            onClick={onClickMenu}
          />

          <Button
            className="absolute top-[-6%] right-[-15px] border-0 bg-white"
            shape="circle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          />
        </div>
        <BottomUser isCollapse={collapsed} />
      </Sider>
      <Layout>
        <Content className="p-5 overflow-scroll">{children}</Content>
        <ModalConfirmLogout isOpen={modal.name === "modalConfirmLogout"} />
      </Layout>
    </Layout>
  );
};

export const Logo = () => (
  <div className="text-white h-[59px] flex items-center justify-center">
    <div className="border-2 border-[#4cb134] w-[50px] h-[50px] rounded-full flex items-center justify-center flex-col">
      <div className="text-[#4cb134] text-2xl">
        MA
        <div className="text-red-600 text-[7px] mt-[-19px] text-center">
          JOIN
        </div>
      </div>
    </div>
  </div>
);

export const TextLogo = () => (
  <div className="h-[59px] flex items-center pl-4">
    <div className="text-[#4cb134] text-2xl">MA</div>
    <div className="text-red-600 text-2xl">JOIN</div>
  </div>
);

export default LayoutBased;
