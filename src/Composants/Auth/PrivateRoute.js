import React from "react";

import { useAuth } from "./AuthContext";
import { Redirect, Route } from "react-router-dom";


export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                );
            }}
        ></Route>
    );
}
