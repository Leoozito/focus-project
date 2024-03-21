import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import Login from "./pages/Login";
import Formulario from "./pages/FormRegister";
import isAuthenticated from "./Auth";
import {Fragment, useEffect} from "react"

const rotasPrivadas = [
    {
        path: '/',
        element: <HomePage/>
    },
];

const PrivateRoute = ({element, ...rest}) => {
    <Route 
        {...rest} render={props => (
            isAuthenticated() ? (
                <Outlet {...rest} element={element}/>
            ) : (
                <Navigate to={{pathname: '/users/sign-in', state: { from: props.location } }}/>
            )
        )} 
    />
}

const RoutesAuth = () => {
    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path='/' element={<PrivateRoute/>}>
                        {rotasPrivadas.map((rota, index) => (
                            <Route
                                key={index}
                                path={rota.path} 
                                element={rota.element}
                            />
                        ))}
                    </Route>
                    <Route exact path='/users/sign-in' element={<Login/>}/>
                    <Route exact path='/users/sign-up' element={<Formulario/>}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
};

export default RoutesAuth;