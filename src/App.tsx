import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css'
import RootLayout from './layout/RootLayout;';
import NotFound from './pages/NotFound';
import ProtectedLayout from './layout/ProtectedLayout';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Review from './pages/Review';
import Library from './pages/Library';
import Profile from './pages/Profile';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;