import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import React, { ReactNode, useState, useMemo } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {MenuInfo} from 'rc-menu/lib/interface'
const { Header, Sider, Content } = Layout;

interface IMenu {
  key:String, 
  item:ReactNode, 
  domEvent:Event, 
  keyPath: String[]
}

const LayoutBased: React.FC<{children:ReactNode}> = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;
  const [collapsed, setCollapsed] = useState(false);

  const onClickMenu = ({key}:MenuInfo) => {
    switch(key){
      case '/barang':
        navigate('/barang');
        break;
      case '/incoming':
        navigate('/incoming');
        break;
      case '/monitoring':
        navigate('/monitoring');
        break;
      default:
        navigate('/outgoing');
        break;
    }
  }


  return (
    <Layout className='h-screen'>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}>
        <div className='relative'>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/barang']}
            selectedKeys={[pathname]}
            items={[
              {
                key: '/barang',
                icon: <UserOutlined />,
                label: 'Barang',
              },
              {
                key: '/incoming',
                icon: <VerticalAlignBottomOutlined />,
                label: 'Incoming',
              },
              {
                key: '/outgoing',
                icon: <VerticalAlignTopOutlined />,
                label: 'Outgoing',
              },
              {
                key: '/monitoring',
                icon: <PieChartOutlined />,
                label: 'Monitoring'
              }
            ]}
            onClick={onClickMenu}
          />
          
          <Button
            className='absolute top-4 right-[-10px] border-0 bg-white'
            shape="circle"
            onClick={() => setCollapsed(!collapsed)} 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } 
          />
        </div>
      </Sider>
      <Layout>
        <Content className='p-5'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutBased;