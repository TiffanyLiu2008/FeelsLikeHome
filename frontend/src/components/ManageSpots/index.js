import './ManageSpots.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/index';

const ManageSpots = () => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.session);
    const spots = useSelector(state => Object.values(state.spots));
    useEffect(() => {
        dispatch(getMySpots());
    }, [dispatch]);
    let hasSpots;
    spots ? hasSpots = true : hasSpots = false;
    return (
        <div>
            <p className='title'>Manage Spots</p>
            {!hasSpots && <Link to={'/spots/new'}><button className='create'>Create a New Spot</button></Link>}
            {hasSpots && <ul>
                {spots.map((spot) => (
                    <SpotIndexItem spot={spot} key={spot.id}/>
                ))}
             </ul>}
        </div>
    );
};

export default ManageSpots;
