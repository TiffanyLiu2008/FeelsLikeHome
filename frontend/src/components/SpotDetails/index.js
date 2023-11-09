import './SpotDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/index';
import SpotReviews from '../SpotReviews/index';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getSpotDetails(spotId)).then(() => setIsLoading(false));
  }, [dispatch, spotId]);
  const handleReserve = (e) => {
    alert('Feture Coming Soon...');
  };
  if (isLoading) return (<>Loading...</>);
  const {name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews} = spot;
  let reviewReviews;
  numReviews > 1 ? reviewReviews = 'reviews' : reviewReviews = 'review';
  return (
    <div>
      <h2>{name}</h2>
      <p>{city}, {state}, {country}</p>
      <p>Image</p>
      <h2>Hosted by {Owner.firstName} {Owner.lastName}</h2>
      <p>{description}</p>
      <h2>$ {price} night</h2>
      <p>{avgStarRating}</p>
      <p>{numReviews} {reviewReviews}</p>
      <button onClick={handleReserve}>Reserve</button>
      <h2>{avgStarRating} {numReviews} {reviewReviews}</h2>
      <OpenModalButton/>
      <SpotReviews/>
    </div>
  )
};

export default SpotDetails;
