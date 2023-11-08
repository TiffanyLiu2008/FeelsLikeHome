import './SpotDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  console.log(spot);
  const {name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews} = spot;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getSpotDetails(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);
  if (!isLoaded) return (<>Loading...</>);
  return (
    <div>
      <h2>{name}</h2>
      <p>{city}, {state}, {country}</p>
      {/* fetch spotImages */}
      <h2>Hosted by {Owner.firstName} {Owner.lastName}</h2>
      <p>{description}</p>
      <h2>${price} night</h2>
      <p>{avgStarRating}</p>
      <p>{numReviews} reviews</p>
      <button>Reserve</button>
      <h2>{avgStarRating} {numReviews} reviews</h2>
      {/* fetch Reviews */}
    </div>
  );
};

export default SpotDetails;
