import './PostReview.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview, getSpotReviews } from '../../store/reviews';
import { getSpotDetails } from '../../store/spots';
import { FaStar } from 'react-icons/fa';

function PostReviewModal({spot}) {
    const colors = {gray: 'CCCCCC', black: '000000'};
    const fiveStars = Array(5).fill(0);
    const spotId = spot.id;
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(undefined);
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleClick = (value) => {setStars(value)};
    const handleMouseOver = (value) => {setHoverStars(value)};
    const handleMouseLeave = (value) => {setHoverStars(undefined)};
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {review, stars};
        dispatch(createReview(spotId, reviewData))
        .then(() => dispatch(getSpotReviews(spotId)))
        .then(() => dispatch(getSpotDetails(spotId)))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <p className='postReviewHeading'>How was your stay?</p>
            <label className='postReviewNormal'>
                <textarea className='postReviewNormal' value={review} placeholder='Leave your review here...' onChange={(e) => setReview(e.target.value)} required/>
            </label>
            <div className='postReviewNormal'>
                {fiveStars.map((_, index) => {return (
                    <FaStar className='postReviewNormal'
                        key={index}
                        color={(hoverStars || stars) > index ? colors.black: colors.gray}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                    />
                )})} Stars
            </div>
            <button className='submitReviewButton' type='submit' disabled={review.length < 10 || stars < 1}>Submit Your Review</button>
        </form>
    );
}

export default PostReviewModal;
