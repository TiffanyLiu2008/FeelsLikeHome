import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/index';
import './SpotIndex.css';

const SpotIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);
  return (
    <div className='box'>
      <ul>
        {spots.map((spot) => (
          <SpotIndexItem spot={spot} key={spot.id}/>
        ))}
      </ul>
    </div>
  );
};

export default SpotIndex;
