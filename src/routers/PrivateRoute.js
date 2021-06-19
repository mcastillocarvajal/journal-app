import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({ isLoggedIn, component: Component, ...rest}) => {

    return (
        <Route 
            { ...rest }
            component={ props => (
                ( isLoggedIn )
                    ? <Component { ...props } />
                    : <Redirect to='/auth/login' />
            )}
        />
    )
}

PrivateRoute.protoTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
