import './DeleteReview.css';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from '../../store/reviews';
import { getSpotReviews } from '../../store/reviews';

const DeleteReviewModal = ({review}) => {
    const reviewId = review.id;
    const spotId = review.spotId;
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId))
        .then(() => dispatch(getSpotReviews(spotId)))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };
    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this review?</p>
            <button onClick={handleDelete}>Yes - Delete Review</button>
            <button onClick={closeModal}>No - Keep Review</button>
        </div>
    );
}

export default DeleteReviewModal;
