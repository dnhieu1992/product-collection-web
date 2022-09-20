import React from 'react';
import { Navigate } from 'react-router-dom';

import userService from '../../../ultils/userService';

export interface PrivateRouteProps {
    component: JSX.Element
}

const PrivateRoute = ({
    component
}: PrivateRouteProps): JSX.Element => {
    if (!userService.isUserLogged()) {
        return <Navigate to={{ pathname: "/login" }} />
    }

    return component
}

export default PrivateRoute