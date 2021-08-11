import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Crud from 'src/pages/Crud'
import { Navigate } from "react-router-dom";

import DashboardLayout from 'src/components/DashboardLayout'
import DashboardContent from './components/DashboardContent';

import ViewsGuard from './pages/ViewsGuard';
import { baseUrl } from './utils/const';

const routes = [
  {
    path: baseUrl, children: [
        {path: "/", element: <Navigate to="app/images"/>},
        {
          path: '/app', element: <DashboardLayout/>, children :[
            {
              path: '/images', element: <DashboardContent/>
            },
            {
              path: '*', element: <NotFound />
            }
          ]
        }
    ]
  }
]

export default routes;
