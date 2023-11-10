import './SpotIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal/index';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const {name, SpotImages, city, state, price, avgRating} = spot;
  return (
    <div>
      <h2>{name}</h2>
      <Link to={`/spots/${spot.id}`}><button>Image</button></Link>
      <p2>{city}, {state}, {avgRating}</p2>
      <p>$ {price} night</p>
      <Link to={`/spots/${spot.id}/edit`}><button>Update</button></Link>
      <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteSpotModal/>}/>
    </div>
  );
};

export default SpotItem;
