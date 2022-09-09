import Route from "./route";
import LayoutBased from "./commons/components/Layout";
import { useLocation } from "react-router-dom";
import Login from "./pages/login";
import Landing from "@/pages/landing"

const App = () => {
  const location = useLocation();
  const {pathname} = location;
  
  if(pathname === '/'){
    return(<Landing />)
  }

  if(pathname === '/login'){
    return <Login />
  }

  return (
    <LayoutBased>
      <Route />
    </LayoutBased>)
    
}

export default App
