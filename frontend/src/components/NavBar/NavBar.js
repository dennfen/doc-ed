import React from 'react';
import logo from '../../assets/logo/doced-logo.png';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
    return (
        <>
            <img className='nav-bar__logo' src={logo} alt='logo' />
            <nav className='nav-bar'>
                <NavLink exact to='/' className='nav-bar__link' activeClassName='nav-bar__link--active'>Dashboard</NavLink>
                <NavLink to='/bugtracker' className='nav-bar__link' activeClassName='nav-bar__link--active'>Bug Tracker</NavLink>
                <NavLink to='/visualization' className='nav-bar__link' activeClassName='nav-bar__link--active'>Visualization</NavLink>
            </nav>
        </>
    );
};

export default NavBar;