import './SpotDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import OpenModalMenuButton from '../Navigation/OpenModalMenuItem';
import PostReviewModal from '../PostReviewModal/index';
import SpotReviews from '../SpotReviews/index';

const SpotDetails = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getSpotDetails(spotId)).then(() => setIsLoading(false));
  }, [dispatch, spotId]);
  const handleReserve = (e) => {
    alert('Feature Coming Soon...');
  };
  if (isLoading) return (<>Loading...</>);
  const {name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews} = spot;
  let reviewNums;
  if (numReviews === 0) {
    reviewNums = '';
  } else if (numReviews === 1) {
    reviewNums ='1 review';
  } else {
    reviewNums = numReviews + 'reviews';
  }
  let reviewStars;
  numReviews > 0 ? reviewStars = avgStarRating.toFixed(1) : reviewStars = 'New';
  let firstReview;
  numReviews === 0 ? firstReview = 'Be the first to post a review!' : firstReview = '';
  let checkUserVSOwner;
  // Owner.id === ;
  return (
    <div className='grid-container'>
      <p className='title'>{name}</p>
      <p className='cityState'>{city}, {state}, {country}</p>
      <div className='imgSec'>
        <p className='image0'>Big Image</p>
        <p className='image1'>Image #1</p>
        <p className='image2'>Image #2</p>
        <p className='image3'>Image #3</p>
        <p className='image4'>Image #4</p>
      </div>
      <div className='infoSec'>
        <p className='owner'>Hosted by {Owner.firstName} {Owner.lastName}</p>
        <p className='description'>{description}</p>
      </div>
      <div className='reserveSec'>
        <p className='priceStars'>$ {price} night ★ {reviewStars} · {reviewNums}</p>
        <button className='button' onClick={handleReserve}>Reserve</button>
      </div>
      <div className='reviewSec'>
        <p className='reviews'>★ {reviewStars} {reviewNums}</p>
        <OpenModalMenuButton user={sessionUser} className='button' itemText='Post Your Review' modalComponent={<PostReviewModal/>}/>
        <p className='firstReview'>{firstReview}</p>
        <SpotReviews className='eachReview'/>
      </div>
    </div>
  )
};

export default SpotDetails;
