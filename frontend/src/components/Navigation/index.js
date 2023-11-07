import React from 'react';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllSpots } from '../store/spots';
// import SpotDetails from '../SpotDetails/index';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();
    // const spots = useSelector(state => Object.values(state.spots));
    // console.log(spots);
    // useEffect(() => {
    //     dispatch(getAllSpots());
    // }, [dispatch]);
    return (
        <section>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser}/>
                    </li>
                )}
            </ul>
            {/* <ul>
                {spots.map((spot) => (
                    <SpotDetails
                        spot={spot}
                        key={spot.id}
                    />
                ))}
            </ul> */}
        </section>
    );
}

export default Navigation;
