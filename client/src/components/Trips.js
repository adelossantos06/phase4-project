import React, { useContext } from "react";
import NavBar from "./Navbar";
import { UserContext } from "./UserContext";



function Trips() {
    const { username } = useContext(UserContext)
    return (
        <>
            <h2>Trip Planner</h2>
            {<h2>Welcome {username}!</h2>}
            <NavBar />
        </>
    )
}

export default Trips