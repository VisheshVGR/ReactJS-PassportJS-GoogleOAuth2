import React, { useEffect, useState } from "react";
import Header from "./Header";

const HomePage = () => {
    const [state, setState] = useState({
        user: {},
        error: null,
        authenticated: false,
    })

    useEffect(() => {
        // Fetch does not send cookies. So you should add credentials: 'include'
        fetch("http://localhost:4000/", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                setState({
                    authenticated: true,
                    user: responseJson.user
                });
            })
            .catch(error => {
                setState({
                    authenticated: false,
                    error: "Failed to authenticate user"
                });
            });
    }, [])

    const handleNotAuthenticated = () => {
        setState({ authenticated: false })
    }

    console.log(state)
    return (
        <>
            <Header authenticated={state.authenticated} handleNotAuthenticated={handleNotAuthenticated} />

            {
                !state.authenticated ?
                    <h1> Welcome </h1> :
                    <>
                        <h1>You have login succcessfully!</h1>
                        <h2>Welcome {state.user.displayName}!</h2>
                    </>
            }
        </>
    )
}


export default HomePage