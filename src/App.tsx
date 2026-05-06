import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css'
import RootLayout from './layout/RootLayout';
import NotFound from './pages/NotFound';
import ProtectedLayout from './layout/ProtectedLayout';
import Home from './pages/Home';
import Review from './pages/Review';
import Library from './pages/Library';
import Profile from './pages/Profile';
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