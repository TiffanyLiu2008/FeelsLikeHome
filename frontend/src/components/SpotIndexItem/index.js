import './SpotIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal/index';
import spotImg from '../../images/0.png';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {name, city, state, price, avgRating, ownerId} = spot;
  const avgStarRating = avgRating ? parseFloat(avgRating).toFixed(1) : 'New';
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === ownerId ? true : false;
  return (
    <div className='box'>
      <Link to={`/spots/${spot.id}`}><p className='title'>{name}</p></Link>
      <Link to={`/spots/${spot.id}`}><img className='image' src={spotImg} alt='spot'/></Link>
      <p className='cityState'>{city}, {state}</p>
      <p className='stars'>★ {avgStarRating}</p>
      <p className='price'>$ {price} night</p>
      {checkUserVSOwner && <Link to={`/spots/${spot.id}/edit`}><button className='updateSpotButton'>Update</button></Link>}
      {checkUserVSOwner && <OpenModalMenuItem className='deleteSpotButton' itemText='Delete' modalComponent={<DeleteSpotModal spot={spot}/>}/>}
    </div>
  );
};

export default SpotItem;
