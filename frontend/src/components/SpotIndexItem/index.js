import './SpotIndexItem.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { getSpotReviews } from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal/index';
import spotImg from '../../images/0.png';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spotData = useSelector(state => state.spots[spot.id]);
  const reviews = useSelector(state => state.reviews[spot.id]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getSpotDetails(spot.id))
    .then(() => dispatch(getSpotReviews(spot.id)))
    .then(() => setIsLoading(false));
  }, [dispatch, spot.id]);
  if (isLoading) return (<>Loading...</>);
  const {name, city, state, price, avgStarRating, ownerId} = spotData;
  const avgRating = avgStarRating ? parseFloat(avgStarRating).toFixed(1) : 'New';
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === ownerId ? true : false;
  return (
    <div className='spotTile'>
      <span className='tooltip'>{name}</span>
      <Link to={`/spots/${spot.id}`}><img className='image' src={spotImg} alt='spot'/></Link>
      <Link to={`/spots/${spot.id}`}><p className='cityState'>{city}, {state}</p></Link>
      <Link to={`/spots/${spot.id}`}><p className='stars'>★ {avgRating}</p></Link>
      <Link to={`/spots/${spot.id}`}><p className='price'>$ {price} per night</p></Link>
      {checkUserVSOwner && <Link to={`/spots/${spot.id}/edit`}><button className='updateSpotButton'>Update</button></Link>}
      {checkUserVSOwner && <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteSpotModal spot={spot}/>}/>}
    </div>
  );
};

export default SpotItem;
