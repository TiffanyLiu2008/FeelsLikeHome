import './SpotIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';

const SpotItem = ({ spot }) => {
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id));
  };
  return (
    <li>
      <div className="li-contents-flex">
        <Link to={`/spots/${spot.id}`}>{spot.id}</Link>
        <div className="buttons-container">
          <Link
            className="edit-link"
            to={`/spots/${spot.id}/edit`}
          >
            Update
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default SpotItem;
