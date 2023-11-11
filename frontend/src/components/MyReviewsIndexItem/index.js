import './MyReviewsIndexItem.css';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';

const MyReviewItem = ({ singleReview }) => {
  const dispatch = useDispatch();
  const {review, createdAt, Spot} = singleReview;
  const {name} = Spot;
  const handleUpdate = (e) => {
    alert('Feature Coming Soon...');
  };
  return (
    <div>
      <h2>{name}</h2>
      <p>{createdAt}</p>
      <p>{review}</p>
      <button onClick={handleUpdate}>Update</button>
      <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal/>}/>
    </div>
  );
};

export default MyReviewItem;
