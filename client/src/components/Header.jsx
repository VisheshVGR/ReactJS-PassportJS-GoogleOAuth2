import { Link } from "react-router-dom";
import React from "react";

const Header = ({ authenticated, handleNotAuthenticated }) => {

    const handleLogout = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage
        window.open("http://localhost:4000/auth/logout", "_self");
        handleNotAuthenticated();
    }

    const handleLogin = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        // Upon successful login, a cookie session will be stored in the client
        window.open("http://localhost:4000/auth/google", "_self");
    }
    return (
        <>
            <div style={{ backgroundColor: "#ddd" }}>
                <Link to="/">Home</Link>
                <br />
                {
                    authenticated ?
                        <>
                            <button onClick={handleLogout}>Logout</button>
                        </> :
                        <>
                            <button onClick={handleLogin}>Login</button>
                        </>
                }


            </div>
        </>
    )
}

export default Header
