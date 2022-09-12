import { LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {MenuInfo} from 'rc-menu/lib/interface'
import useLoginStore from '@/pages/login/store';
import useModalStore from '../store/ModalStore';

interface IBottomUser{
  isCollapse:boolean
}

const BottomUser = ({isCollapse}:IBottomUser) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {username} = useLoginStore((state)=>state)
  const {setModal, modal} = useModalStore((state)=>state)
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

    <div className='absolute flex items-center justify-between bottom-0 left-0 p-4 border-gray-100 border-t-2 w-full'>
      {!collapsed && (<div>
        {username}
      </div>)}
      <LogoutOutlined onClick={() => setModal({...modal,name:'modalConfirmLogout'})} className='cursor-pointer hover:text-[#1890ff]' />
    </div>
  );
};



export default BottomUser;