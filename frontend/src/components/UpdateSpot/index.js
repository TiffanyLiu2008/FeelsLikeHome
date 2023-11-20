import SpotForm from '../SpotForm/index';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { useEffect } from 'react';

const UpdateSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);
  if (!spot) return(<></>);
  return (
    Object.keys(spot).length > 1 && (
      <>
        <SpotForm spot={spot} formType="Update Spot"/>
      </>
    )
  );
};

export default UpdateSpot;
