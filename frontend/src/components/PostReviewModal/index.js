import './PostReview.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function PostReviewModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        // const newReview = await dispatch();
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>How was your stay?</h2>
            <div className='errors'>{errors.review}</div>
            <label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} required/>
            </label>
            <div className='errors'>{errors.stars}</div>
            <label>
                <input type='text' value={stars} onChange={(e) => setStars(e.target.value)} required/>
            </label>
            <button type='submit'>Submit Your Review</button>
        </form>
    );
}

export default PostReviewModal;
