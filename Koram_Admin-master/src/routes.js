import { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import NotFound from './pages/Page404';
// import Register from './pages/Register2';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Login';
import Room from './pages/Room';


// ----------------------------------------------------------------------

export default function Router() {
  
  const [login, setLogin] = useState(false)
   useEffect(()=>{
   axios.get("/api/v1/isLogin").then((res)=>{
     setLogin(true)
   })
  
   },[])
  return useRoutes([
    {
      path: '/dashboard',
      element: <>{ console.log(login)} <DashboardLayout  setLogin={setLogin}/></>,
      children: [
        { path: '', element:<> {login? <DashboardApp /> :<Navigate to="/"/>}</> },
        { path: 'user', element: <User /> },
        { path: 'room', element: <Room /> },
      ],
    },
    {
      path: '/',
      element:login?<Navigate to="/dashboard"/>:<LogoOnlyLayout />,
      children: [
        { path: '/', element: <Login setLogin={setLogin}/>},
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ]);
}
