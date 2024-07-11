import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
    <nav className='nav'>
        <ul>
            <li>
                <NavLink>
                    <button className="navButton" >Trips</button>
                </NavLink>
            </li>
        </ul>
    </nav>
}

export default NavBar