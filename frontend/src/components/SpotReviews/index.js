import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';
import SpotReviewItem from '../SpotReviewsIndexItem/index';

const SpotReviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = useSelector(state => state.reviews[spotId]);
    console.log('reviews', reviews);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getSpotReviews(spotId)).then(() => setIsLoading(false));
    }, [dispatch, spotId]);
    if (isLoading) return (<>Loading...</>);
    if (!reviews) return (<p>Be the first to post a review!</p>);
    const arrReviews = Object.values(reviews);
    const sortedArrReviews = arrReviews.sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return (
        <div>
            <ul>
                {sortedArrReviews.map((review) => {return <SpotReviewItem eachReview={review} key={review.id}/>})}
            </ul>
        </div>
    )
};

export default SpotReviews;
