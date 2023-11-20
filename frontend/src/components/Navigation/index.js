import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoImg from '../../images/logo.jpg';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const sessionUserId = sessionUser ? sessionUser.id : null;
    return (
        <ul className='nav'>
            <li>
                <NavLink exact to="/"><img className='logo' src={logoImg} alt='logo'/></NavLink>
            </li>
            {isLoaded && (
                <div className='buttons'>
                <ul>
                    {sessionUserId && <Link to={'/spots/new'}><button className='create'>Create a New Spot</button></Link>}
                </ul>
                <ul>
                    <ProfileButton user={sessionUser}/>
                </ul>
                </div>
            )}
        </ul>
    );
}

export default Navigation;
