import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css'
import RootLayout from './layout/RootLayout';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;