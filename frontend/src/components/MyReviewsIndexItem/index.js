import './MyReviewsIndexItem.css';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';

const MyReviewItem = ({ singleReview }) => {
  const dispatch = useDispatch();
  const {review, createdAt, Spot} = singleReview;
  const {name} = Spot;
  return (
    <div>
      <p className='subheading'>{name}</p>
      <p className='subheading'>{createdAt}</p>
      <p className='normal'>{review}</p>
      <OpenModalMenuItem className='deleteReviewButton' itemText='Delete' modalComponent={<DeleteReviewModal/>}/>
    </div>
  );
};

export default MyReviewItem;
