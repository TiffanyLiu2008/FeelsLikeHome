import './ManageSpots.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/index';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    useEffect(() => {
        dispatch(getMySpots());
    }, [dispatch]);
    return (
        <div>
            <h1>Manage Your Spots</h1>
            <Link to={'/spots/new'}><button>Create a New Spot</button></Link>
            <ul>
                {spots.map((spot) => (
                    <SpotIndexItem spot={spot} key={spot.id}/>
                ))}
             </ul>
        </div>
    );
};

export default ManageSpots;
