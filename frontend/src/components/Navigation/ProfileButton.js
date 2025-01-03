import './ProfileButton.css';
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/');
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className='profileButton' onClick={openMenu}>
                <i className="fas fa-user-circle" style={{fontSize: "25px"}}/>
            </button>
            {showMenu &&
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <div>
                        <li className='info'>Hello {user.firstName}</li>
                        <li className='info'>{user.email}</li>
                        <li className='manageSpots'>
                            <Link to={'/spots/current'}>Manage Spots</Link>
                        </li>
                        <li className='manageReviews'>
                            <Link to={'/reviews/current'}>Manage Reviews</Link>
                        </li>
                        <div>
                            <button className='logoutButton' onClick={logout}>Log Out</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
            }
        </>
    );
}

export default ProfileButton;
