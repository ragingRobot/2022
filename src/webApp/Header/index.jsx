import React from 'react';
import { NavLink } from "react-router-dom";
import Nav from './Nav';

function Header() {
    return (
        <header>
            <h1><NavLink to="/" aria-current='page'>Josh Milstead</NavLink></h1>
            <sub>Engineer — Artist — Creator Of Things</sub>
            <Nav />
        </header>
    );
}

export default Header;
