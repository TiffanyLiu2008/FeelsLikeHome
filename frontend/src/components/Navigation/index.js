import './Navigation.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoImg from '../../images/logo.jpg';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const sessionUserId = sessionUser ? sessionUser.id : null;
    return (
        <ul className='nav'>
            <div className='logoName'>
            <ul>
                <NavLink exact to="/"><img className='logo' src={logoImg} alt='logo'/></NavLink>
            </ul>
            <ul>
                <NavLink exact to="/"><p className='siteName'>FeelsLikeHome</p></NavLink>
            </ul>
            </div>
            {isLoaded && (
                <div className='buttons'>
                <ul>
                    {sessionUserId && <Link to={'/spots/new'}><button className='createSpotButton'>Create a New Spot</button></Link>}
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
