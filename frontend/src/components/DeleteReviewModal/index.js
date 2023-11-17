import './DeleteReview.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from '../../store/reviews';

const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id));
        closeModal();
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
