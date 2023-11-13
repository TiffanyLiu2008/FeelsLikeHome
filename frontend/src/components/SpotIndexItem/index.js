import './SpotIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal/index';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const {name, SpotImages, city, state, price, avgRating} = spot;
  const avgStarRating = avgRating.toFixed(1);
  return (
    <div className='grid-container'>
      <p className='title'>{name}</p>
      <p className='image'>IMG</p>
      {/* <a className='image' target='{`/spots/${spot.id}`}' href='spot.jpg'>
        <img src='../../../images/spot.png' alt='spot'/>
      </a> */}
      <p className='cityState'>{city}, {state}</p>
      <p className='stars'>{avgStarRating}</p>
      <p className='price'>$ {price} night</p>
      <Link to={`/spots/${spot.id}/edit`}><button className='update'>Update</button></Link>
      <OpenModalMenuItem className='delete' itemText='Delete' modalComponent={<DeleteSpotModal/>}/>
    </div>
  );
};

export default SpotItem;
