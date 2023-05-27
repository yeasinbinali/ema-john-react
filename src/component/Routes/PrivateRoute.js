import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../../loading/Loading';
import { AuthContext } from '../../UserContext/UserContext';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);

    if(loading) {
        return <Loading></Loading>
    }

    if(user && user.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;