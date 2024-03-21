import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import FormRegister from "../pages/FormRegister";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <HomePage/>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login/>,      
    },
    {
      path: "/register",
      element: <FormRegister/>  
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;