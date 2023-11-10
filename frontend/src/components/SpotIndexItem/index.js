import './SpotIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const {name, SpotImages, city, state, price, avgRating} = spot;

  const handleUpdate = (e) => {};

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id));
  };
  return (
    <div>
      <h2>{name}</h2>
      <Link to={`/spots/${spot.id}`}><button>Image</button></Link>
      <p2>{city}, {state}, {avgRating}</p2>
      <p>$ {price} night</p>
      {/* <OpenModalMenuItem user={sessionUser} onto={`/spots/${spot.id}/edit`}><button>Update</button></Link>
      <OpenModalMenuItem user={sessionUser} onClick={handleDelete}>Delete</button> */}
    </div>
  );
};

export default SpotItem;
