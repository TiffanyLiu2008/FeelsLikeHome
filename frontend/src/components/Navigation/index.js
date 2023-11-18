import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const sessionUserId = sessionUser ? sessionUser.id : null;
    return (
        <ul>
            <li>
                <NavLink exact to="/">FeelsLikeHome</NavLink>
            </li>
            {isLoaded && (
                <>
                <ul>
                    <ProfileButton user={sessionUser}/>
                </ul>
                <ul>
                    {sessionUserId && <Link to={'/spots/new'}><button>Create a New Spot</button></Link>}
                </ul>
                </>
            )}
        </ul>
    );
}

export default Navigation;
