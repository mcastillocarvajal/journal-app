import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PublicRoute = ({ isLoggedIn, component: Component, ...rest}) => {

    return (
        <Route 
            { ...rest }
            component={ props => (
                ( isLoggedIn )
                    ? <Redirect to='/' />
                    : <Component { ...props } />
            )}
        />
    )
}

PublicRoute.protoTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
