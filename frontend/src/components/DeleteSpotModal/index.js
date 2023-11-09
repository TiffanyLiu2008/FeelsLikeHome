import './DeleteSpot.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteSpotModal() {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const handleDelete = (e) => {

    };
    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <button onClick={handleDelete}>Yes - Delete Spot</button>
            <button onClick={closeModal}>No - Keep Spot</button>
        </div>
    );
}

export default DeleteSpotModal;
