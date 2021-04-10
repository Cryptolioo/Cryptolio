import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// The private route component allows me to create private routes so
// some pages are only accessible if the user is logged in. By using
// a token stored in local storage I can check if the user is logged in
// or not and redirect them to the landing page if the token is not there
export const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />  
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);