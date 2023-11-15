import './SpotReviewsIndexItem.css';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';
import reviewsReducer from '../../store/reviews';

const SpotReviewItem = ({ eachReview }) => {
  const dispatch = useDispatch();
  const {review, createdAt, User} = eachReview;
  const {firstName} = User;
  const convertDate = (oldDate) => {
    const str = oldDate.split('-');
    const findMonth = {'1': 'Janurary', '2': 'February', '3': 'March', '4': 'April', '5': 'May', '6': 'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'};
    return  findMonth[str[1]] + ' ' + str[0];
  };
  const date = convertDate(createdAt);
  let checkUserVSReviewer;
  // User.id === ;
  return (
    <div>
      <p>{firstName}</p>
      <p>{date}</p>
      <p>{review}</p>
      <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal/>}/>
    </div>
  );
};

export default SpotReviewItem;
