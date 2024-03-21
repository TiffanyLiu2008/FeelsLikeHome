import './ManageReviews.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReviews } from '../../store/reviews';
import SpotReviewItem from '../SpotReviewsIndexItem/index';

const ManageReviews = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getMyReviews()).then(() => setIsLoading(false));
    }, [dispatch]);
    if (isLoading) return (<>Loading...</>);
    const reviewsByUser = reviews.filter(review => review.userId === sessionUser.id);
    return (
        <div>
            <p className='title'>Manage Reviews</p>
            <ul className='manageReviewIndex'>
                {reviewsByUser.map((review) => (
                    <li className='manageEachReview' key={review.id}>
                        <SpotReviewItem eachReview={review} key={review.id}/>
                    </li>
                ))}
             </ul>
        </div>
    );
};

export default ManageReviews;
