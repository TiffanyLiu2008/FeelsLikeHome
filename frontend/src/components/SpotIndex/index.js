import './SpotIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/index';

const SpotIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);
  return (
    <div>
      <ul className='landingSpotIndex'>
        {spots.map((spot) => (
          <li className='landingEachSpot' key={spot.Id}>
            <SpotIndexItem spot={spot} key={spot.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotIndex;
