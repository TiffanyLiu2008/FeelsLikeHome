import './SpotDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import OpenModalMenuButton from '../Navigation/OpenModalMenuItem';
import ReserveModal from '../ReserveModal/index';
import PostReviewModal from '../PostReviewModal/index';
import SpotReviews from '../SpotReviews/index';
import MapContainer from '../Maps/index';

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
  if (isLoading) return (<>Loading...</>);
  const {name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews, lat, lng} = spot;
  const email = Owner.email;
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
      <img className='image0' src={SpotImages[0].url} alt='image0'/>
      <img className='image1' src={SpotImages[1].url} alt='image1'/>
      <img className='image2' src={SpotImages[2].url} alt='image2'/>
      <img className='image3' src={SpotImages[3].url} alt='image3'/>
      <img className='image4' src={SpotImages[4].url} alt='image4'/>
      <MapContainer spot={spot}/>
      <p className='owner'>Hosted by {Owner.firstName} {Owner.lastName}</p>
      <p className='description'>{description}</p>
      <p className='priceStars'>$ {price} night ★ {numReviews > 0 ? parseFloat(avgStarRating).toFixed(1) : 'New'} {centerDot} {numReviews >= 1 && (numReviews == 1 ? '1 Review' : `${numReviews} Reviews`)}</p>
      {sessionUserId && !checkUserVSOwner && <OpenModalMenuButton itemText='Request' modalComponent={<ReserveModal email={email}/>}/>}
      <p className='reviews'>★ {numReviews > 0 ? parseFloat(avgStarRating).toFixed(1) : 'New'} {centerDot} {numReviews >= 1 && (numReviews == 1 ? '1 Review' : `${numReviews} Reviews`)}</p>
      {sessionUserId && !checkUserVSOwner && !checkHasReviewed && <OpenModalMenuButton itemText='Post Your Review' modalComponent={<PostReviewModal spot={spot}/>}/>}
      {sessionUserId && !checkUserVSOwner && !checkHasReviewed && <p className='firstReview'>{firstReview}</p>}
      <SpotReviews className='eachReview'/>
    </div>
  )
};

export default SpotDetails;
