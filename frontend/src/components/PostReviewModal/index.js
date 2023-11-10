import './PostReview.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from '../../store/reviews';
// import ReactStars from "react-rating-stars-component";

function PostReviewModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors) {
            setErrors({});
            return dispatch(createReview({review, stars}))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.erros);
                }
            });
        }
        return setErrors({});
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>How was your stay?</h2>
            <div className='errors'>{errors.review}</div>
            <label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} required/>
            </label>
            <div className='errors'>{errors.stars}</div>
            {/* <ReactStars value={stars} onChange={(e) => setStars(e.target.value)} precision={1} required/> */}
            <label>
                <input type='text' value={stars} onChange={(e) => setStars(e.target.value)} required/>
            </label>
            <button type='submit' disabled={review.length < 10}>Submit Your Review</button>
        </form>
    );
}

export default PostReviewModal;
