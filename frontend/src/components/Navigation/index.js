import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    return (
        <ul>
            <li>
                <NavLink exact to="/">FeelsLikeHome</NavLink>
            </li>
            {isLoaded && (
                <>
                <li>
                    <ProfileButton user={sessionUser}/>
                </li>
                <li>
                    <Link to={'/spots/new'} user={sessionUser}><button>Create a New Spot</button></Link>
                </li>
                </>
            )}
        </ul>
    );
}

export default Navigation;
