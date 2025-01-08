import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import ErrorPage from './Components/ErrorPage';
import Dashboard from './Components/App/Outlet/Dashboard';
import Manage from './Components/App/Outlet/Manager/Manager';
import Reports from './Components/App/Outlet/Reports';
import Settings from './Components/App/Outlet/Settings';
import Login from './Components/Login/Login';
import Auth from './Components/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth view={<App />}/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Auth view={<Dashboard />}/>
      },
      {
        path: '/',
        element: <Auth view={<Manage />}/>
      },
      {
        path: 'reports',
        element: <Auth view={<Reports />}/>
      },
      {
        path: 'settings',
        element: <Auth view={<Settings />}/>
      },
    ]
  },
  {
    path: 'login',
    element: <Auth login={true} view={<Login />}/>,
    errorElement: <ErrorPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
