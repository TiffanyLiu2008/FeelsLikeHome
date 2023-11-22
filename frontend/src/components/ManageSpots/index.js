import './ManageSpots.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/index';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state => Object.values(state.spots));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getMySpots()).then(() => setIsLoading(false));
    }, [dispatch]);
    if (isLoading) return (<>Loading...</>);
    const spotsByUser = spots.filter(spot => spot.ownerId === sessionUser.id);
    const hasSpots = spotsByUser.length ? true : false;
    return (
        <div>
            <p className='title'>Manage Spots</p>
            {!hasSpots && <Link to={'/spots/new'}><button className='createSpotButton'>Create a New Spot</button></Link>}
            {hasSpots && <ul>
                {spotsByUser.map((spot) => (
                    <SpotIndexItem spot={spot} key={spot.id}/>
                ))}
             </ul>}
        </div>
    );
};

export default ManageSpots;
