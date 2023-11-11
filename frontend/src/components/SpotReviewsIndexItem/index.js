import './SpotReviewsIndexItem.css';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';
import reviewsReducer from '../../store/reviews';

const SpotReviewItem = ({ eachReview }) => {
  const dispatch = useDispatch();
  const {review, createdAt, User} = eachReview;
  const {firstName} = User;
  return (
    <div>
      <p>{firstName}</p>
      <p>{createdAt}</p>
      <p>{review}</p>
      <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal/>}/>
    </div>
  );
};

export default SpotReviewItem;
