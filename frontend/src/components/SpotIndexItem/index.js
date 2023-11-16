import './SpotIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal/index';
import spotImg from '../../images/spot.png';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const {name, SpotImages, city, state, price, avgRating} = spot;
  let avgStarRating;
  avgRating ? avgStarRating = avgRating.toFixed(1) : avgStarRating = 'New';
  return (
    <div className='grid-container'>
      <p className='title'>{name}</p>
      <Link to={`/spots/${spot.id}`}><img src={spotImg} alt='spot'/></Link>
      <p className='cityState'>{city}, {state}</p>
      <p className='stars'>★ {avgStarRating}</p>
      <p className='price'>$ {price} night</p>
      <Link to={`/spots/${spot.id}/edit`}><button className='update'>Update</button></Link>
      <OpenModalMenuItem className='delete' itemText='Delete' modalComponent={<DeleteSpotModal/>}/>
    </div>
  );
};

export default SpotItem;
