import Cookies from "js-cookie";
import React from "react";

const withGoogleAuth = (WrappedComponent: any) => {
    const isAuthenticated = () => {
        const token = Cookies.get(".AspNetCore.Cookies");
        // check if the auth token cookie exists and is valid
        return token !== undefined && token !== null && token !== "";
    };

    const RedirectLogin = () => {
        // redirect the user to the login page if not authenticated
        //window.location.href = "/login";
        return null;
    };

    const AuthenticatedComponent = (props: any) => {
        // render the wrapped component if authenticated
        return isAuthenticated() ? <WrappedComponent {...props} /> : <RedirectLogin/>;
    };

    return AuthenticatedComponent;
};

export default withGoogleAuth;