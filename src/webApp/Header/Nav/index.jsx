import React from 'react';
import { NavLink } from "react-router-dom";
function Nav() {
    return (
        <nav role="navigation"
            aria-label="main navigation">
            <ul>
                <li><NavLink to="software" aria-current='page'>Software Projects</NavLink></li>
                <li><NavLink to="art" >Art Projects</NavLink></li>
                <li><NavLink to="resume" >Work History</NavLink></li>
                <li><NavLink to="contact" >Contact</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;
