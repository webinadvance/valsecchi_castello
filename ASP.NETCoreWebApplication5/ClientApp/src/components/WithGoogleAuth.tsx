import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

const withGoogleAuth = (WrappedComponent: any) => {
  const isAuthenticated = () => {
    const token = Cookies.get('.AspNetCore.Cookies')
		// check if the auth token cookie exists and is valid
		return token !== undefined && token !== null && token !== ''
	};

  const RedirectLogin = () => {
    // redirect the user to the login page if not authenticated
    // window.location.href = "/login";
    useEffect(() => {
      /*            console.log(document.location); */
    })

    return (
			<a
				href={'/api/login?url=' + document.location.href}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
				<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
					alt="Google logo"
					width="20" height="20" className="mr-2"/>
                Login with Google
			</a>
    );
  };

  const AuthenticatedComponent = (props: any) => {
    // render the wrapped component if authenticated
    return isAuthenticated() ? <WrappedComponent {...props} /> : <RedirectLogin/>
	};

  return AuthenticatedComponent
}

export default withGoogleAuth
