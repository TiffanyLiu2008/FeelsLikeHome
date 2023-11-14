import './DeleteSpot.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spots';

const DeleteSpotModal = ({spot}) => {
    console.log(spot);
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id));
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
