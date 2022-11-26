import { Routes, Route as R } from "react-router-dom";
import Login from '@/pages/login';
import Barang from '@/pages/barang';
import Incoming from '@/pages/incoming';
import Outgoing from '@/pages/outgoing';
import Monitoring from '@/pages/monitoring';
import Landing from '@/pages/landing';


const routeUrl = [
  {
    path:'/login',
    element: Login
  },
  {
    
    path:'/barang',
    element: Barang
  },
  {
    path:'/incoming',
    element: Incoming
  },
  {
    path:'/outgoing',
    element: Outgoing
  },
  {
    path:'/monitoring',
    element: Monitoring
  },
  {
    path:'/',
    element:Landing
  }
];


const Route = () => (
  <Routes>
    {routeUrl.map((r,index:number) => (<R key={index} path={r.path} element={<r.element/>} />))}
  </Routes>
)

export default Route;
