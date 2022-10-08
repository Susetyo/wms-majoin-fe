import Route from "./route";
import LayoutBased,{TextLogo} from "./commons/components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import {useEffect} from 'react';
import Login from "./pages/login";
import Landing from "@/pages/landing";
import useLoginStore from "./pages/login/store";
import {Layout} from "antd";

const {Header} = Layout

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {pathname} = location;
  const {username} = useLoginStore((state)=>state);
  
 
  // if(pathname === '/'){
  //   return(<Landing />)
  // }

  if(pathname === '/login' || pathname === '/'){
    return (
      <div className="bg-white">
        <Header className="bg-white border-gray-400 border-b-[1px] flex items-center justify-center">
          <TextLogo />
        </Header>
        <Login />
      </div>
    )
  }

  return (
    <LayoutBased>
      <Route />
    </LayoutBased>)
    
}

export default App
