import './SpotReviewsIndexItem.css';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';

const SpotReviewItem = ({ eachReview }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {review, createdAt, User, Spot} = eachReview;
  const {name} = Spot;
  const {id, firstName} = User;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(createdAt);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === id ? true : false;
  return (
    <div>
      <div className='normal'>
        <p>★ {name}</p>
        <p>★ {firstName}</p>
        <p>{date}</p>
        <p>{review}</p>
      </div>
      {checkUserVSOwner && <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteReviewModal review={eachReview}/> }/>}
    </div>
  );
};

export default SpotReviewItem;
