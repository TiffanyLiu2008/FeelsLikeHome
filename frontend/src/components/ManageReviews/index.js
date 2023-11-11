import './ManageReviews.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReviews } from '../../store/reviews';
// import SpotIndexItem from '../SpotIndexItem/index';

const ManageReviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => Object.values(state.reviews));
    useEffect(() => {
        dispatch(getMyReviews());
    }, [dispatch]);
    return (
        <div>
            <h1>Manage Reviews</h1>
            <ul>
                Test
                {/* {reviews.map((review) => (
                    <SpotIndexItem spot={spot} key={spot.id}/>
                ))} */}
             </ul>
        </div>
    );
};

export default ManageReviews;
