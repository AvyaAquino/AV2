import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AeronavesListPage } from './pages/AeronavesListPage';
import { FuncionariosPage } from './pages/FuncionariosPage';
import { AeronaveDetailPage } from './pages/AeronaveDetailPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AeronaveAddPage } from './pages/AeronaveAddPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/app',
        element: <AppLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'aeronaves', element: <AeronavesListPage /> },
          { path: 'aeronaves/novo', element: <AeronaveAddPage /> },
          { path: 'aeronaves/:codigo', element: <AeronaveDetailPage /> },
          { path: 'funcionarios', element: <FuncionariosPage /> },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}