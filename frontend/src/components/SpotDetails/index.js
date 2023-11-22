import './SpotDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import OpenModalMenuButton from '../Navigation/OpenModalMenuItem';
import PostReviewModal from '../PostReviewModal/index';
import SpotReviews from '../SpotReviews/index';
import image0 from '../../images/0.png';
import image1 from '../../images/1.png';
import image2 from '../../images/2.png';
import image3 from '../../images/3.png';
import image4 from '../../images/4.png';

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
  const firstReview = numReviews == 0 ? 'Be the first to post a review!' : null;
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
      <img className='image0' src={image0} alt='image0'/>
      <img className='image1' src={image1} alt='image1'/>
      <img className='image2' src={image2} alt='image2'/>
      <img className='image3' src={image3} alt='image3'/>
      <img className='image4' src={image4} alt='image4'/>
      <p className='owner'>Hosted by {Owner.firstName} {Owner.lastName}</p>
      <p className='description'>{description}</p>
      <p className='priceStars'>$ {price} night ★ {numReviews > 0 ? parseFloat(avgStarRating).toFixed(1) : 'New'} {centerDot} {numReviews >= 1 && (numReviews == 1 ? '1 Review' : `${numReviews} Reviews`)}</p>
      <button className='reserveButton' onClick={handleReserve}>Reserve</button>
      <p className='reviews'>★ {numReviews > 0 ? parseFloat(avgStarRating).toFixed(1) : 'New'} {centerDot} {numReviews >= 1 && (numReviews == 1 ? '1 Review' : `${numReviews} Reviews`)}</p>
      {sessionUserId && !checkUserVSOwner && !checkHasReviewed && <OpenModalMenuButton className='postReviewButton' itemText='Post Your Review' modalComponent={<PostReviewModal spot={spot}/>}/>}
      {sessionUserId && !checkUserVSOwner && !checkHasReviewed && <p className='firstReview'>{firstReview}</p>}
      <SpotReviews className='eachReview'/>
    </div>
  )
};

export default SpotDetails;
