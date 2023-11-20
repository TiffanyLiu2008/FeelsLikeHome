import './SpotDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import OpenModalMenuButton from '../Navigation/OpenModalMenuItem';
import PostReviewModal from '../PostReviewModal/index';
import SpotReviews from '../SpotReviews/index';
import spotImg from '../../images/spot.png';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots[spotId]);
  const reviews = useSelector(state => state.reviews[spotId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getSpotDetails(spotId)).then(() => setIsLoading(false));
  }, [dispatch, spotId]);
  const handleReserve = (e) => {
    alert('Feature Coming Soon...');
  };
  if (isLoading) return (<>Loading...</>);
  const {name, city, state, country, Owner, description, price, avgStarRating, numReviews} = spot;
  const centerDot = numReviews > 0 ? ' · ' : null;
  const firstReview = numReviews === 0 ? 'Be the first to post a review!' : null;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === Owner.id ? true : false;
  let checkHasReviewed = false;
  if (reviews && Object.values(reviews).length) {
    for (let i = 0; i < Object.values(reviews).length; i++) {
      if (Object.values(reviews)[i].userId === sessionUserId) {
        checkHasReviewed = true;
      }
    }
  }
  return (
    <div className='grid-container'>
      <p className='title'>{name}</p>
      <p className='cityState'>{city}, {state}, {country}</p>
      <div className='imgSec'>
        <img className='image0' src={spotImg} alt='image0'/>
        <img className='image1' src={spotImg} alt='image1'/>
        <img className='image2' src={spotImg} alt='image2'/>
        <img className='image3' src={spotImg} alt='image3'/>
        <img className='image4' src={spotImg} alt='image4'/>
      </div>
      <div className='infoSec'>
        <p className='owner'>Hosted by {Owner.firstName} {Owner.lastName}</p>
        <p className='description'>{description}</p>
      </div>
      <div className='reserveSec'>
        <p className='priceStars'>$ {price} night ★ {numReviews > 0 ? avgStarRating.toFixed(1) : 'New'} {centerDot} {numReviews > 0 && (numReviews === 1 ? '1 Review' : `${numReviews} reviews`)}</p>
        <button className='button' onClick={handleReserve}>Reserve</button>
      </div>
      <div className='reviewSec'>
        <p className='reviews'>★ {numReviews > 0 ? avgStarRating.toFixed(1) : 'New'} {numReviews >= 1 && (numReviews === 1 ? '1 Review' : `${numReviews} reviews`)}</p>
        {sessionUserId && !checkUserVSOwner && !checkHasReviewed && <OpenModalMenuButton className='button' itemText='Post Your Review' modalComponent={<PostReviewModal spot={spot}/>}/>}
        {sessionUserId && !checkUserVSOwner && !checkHasReviewed && <p className='firstReview'>{firstReview}</p>}
        <SpotReviews className='eachReview'/>
      </div>
    </div>
  )
};

export default SpotDetails;
