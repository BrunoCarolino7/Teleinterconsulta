import { ReactElement, ReactNode } from 'react';
import { Navigate, Route, redirect } from 'react-router-dom';
import { Login } from '../pages/login';

type PrivateRouteProps = {
    path: string;
    element: ReactElement;
};

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
    const isAuthenticated = ["", ""];

    return isAuthenticated.length >= 2 ?
        <Route {...rest} element={element} />
        :
        <Route {...rest} element={<Login />} />
};

export default PrivateRoute;

