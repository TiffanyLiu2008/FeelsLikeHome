import './PostReview.css';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from '../../store/reviews';
import { FaStar } from 'react-icons/fa';

function PostReviewModal() {
    const colors = {gray: 'CCCCCC', black: '000000'};
    const fiveStars = Array(5).fill(0);
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(undefined);
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleClick = (value) => {setStars(value)};
    const handleMouseOver = (value) => {setHoverStars(value)};
    const handleMouseLeave = (value) => {setHoverStars(undefined)};
    useEffect(() => {
        const errors = {review: [], stars: []};
        if (!review || review.length < 10) {errors['review'].push('Review needs a minimum of 10 characters');}
        setErrors(errors);
    }, [review, stars]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(createReview({review, stars}))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>How was your stay?</h2>
            <div className='errors'>{errors.review}</div>
            <label>
                <textarea value={review} placeholder='Leave your review here...' onChange={(e) => setReview(e.target.value)} required/>
            </label>
            <div>
                {fiveStars.map((_, index) => {return (
                    <FaStar
                        key={index}
                        color={(hoverStars || stars) > index ? colors.black: colors.gray}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                    />
                )})}
            </div>
            <button type='submit' disabled={review.length < 10}>Submit Your Review</button>
        </form>
    );
}

export default PostReviewModal;
