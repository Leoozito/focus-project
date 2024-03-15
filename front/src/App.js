import React from "react";
import { ReactDOM } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from "./pages/HomePage"; 
import Login from "./pages/Login";
import Formulario from "./pages/FormRegister";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/users/sign-up',
    element: <Formulario/>
  }, 
  {
    path: '/users/sign-in',
    element: <Login/>
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
