import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context-client/context/authProvider";
import useAuth from "../../context-client/hooks/useAuth";




const UserForUser = () => {
    const { auth } = useAuth();
    

    console.log(auth)

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    user && console.log(user.sub)
 
    
    return (
        <div>
            <img ></img>
            <h1>hola</h1>
            <h1>mail</h1>

        </div>
    )
}

export default UserForUser;

/* getAccessTokenSilently */
