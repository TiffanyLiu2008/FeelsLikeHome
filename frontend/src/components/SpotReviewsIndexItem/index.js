import './SpotReviewsIndexItem.css';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';

const SpotReviewItem = ({ eachReview }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {review, createdAt, User} = eachReview;
  const {id, firstName} = User;
  const convertDate = (oldDate) => {
    const str = oldDate.split('-');
    const findMonth = {'1': 'Janurary', '2': 'February', '3': 'March', '4': 'April', '5': 'May', '6': 'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'};
    return  findMonth[str[1]] + ' ' + str[0];
  };
  const date = convertDate(createdAt);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === id ? true : false;
  return (
    <div>
      <div className='normal'>
        <p>{firstName}</p>
        <p>{date}</p>
        <p>{review}</p>
      </div>
      {checkUserVSOwner && <OpenModalMenuItem className='deleteReviewButton' itemText='Delete' modalComponent={<DeleteReviewModal review={eachReview}/> }/>}
    </div>
  );
};

export default SpotReviewItem;
