import './SpotReviews.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../store/reviews';

const SpotReviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = useSelector(state => state.reviews[spotId]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getAllReviews(spotId)).then(() => setIsLoading(false));
    }, [dispatch, spotId, reviews]);
    if (isLoading) return (<>Loading...</>);
    if (!reviews) return (<p>Be the first to post a review!</p>);
    return (
        <div>
            <ul>
                {reviews.map((eachReview) => {
                    <li key={eachReview.id}>
                        <p>{eachReview.User.firstName}</p>
                        <p>{eachReview.createdAt}</p>
                        <p>{eachReview.review}</p>
                    </li>
                })}
            </ul>
        </div>
    )
};

export default SpotReviews;
