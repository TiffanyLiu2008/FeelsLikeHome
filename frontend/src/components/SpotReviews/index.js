import './SpotReviews.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal/index';

const SpotReviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = useSelector(state => state.reviews[spotId]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getAllReviews(spotId)).then(() => setIsLoading(false));
    }, [dispatch, spotId]);
    if (isLoading) return (<>Loading...</>);
    if (!reviews) return (<p>Be the first to post a review!</p>);
    return (
        <div>
            <ul>
                {Object.values(reviews).map((review) => {
                    return <li key={review.id}>
                        <p>{review.User.firstName}</p>
                        <p>{review.createdAt}</p>
                        <p>{review.review}</p>
                        <OpenModalMenuItem itemText='Delete' modelComponent={<DeleteReviewModal/>}/>
                    </li>
                })}
            </ul>
        </div>
    )
};

export default SpotReviews;
