import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import ModalPage from "./pages/modalPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <MainPage />,
        children: [
          {
            path: "modal",
            element: <ModalPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
