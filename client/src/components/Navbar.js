import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
    return (

        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to="/createtrip">
                        <button className="navButton" >Create New Trip</button>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/trips">
                        <button className="navButton" >View All Trips</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trips">
                        <button className="navButton" >Manage Account</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trips">
                        <button className="navButton" >Log Out</button>
                    </NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default NavBar