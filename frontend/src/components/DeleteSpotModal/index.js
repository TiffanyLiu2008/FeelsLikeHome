import './DeleteSpot.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spots';

const DeleteSpotModal = ({spot}) => {
    const spotId = spot.id;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
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
            <p className='heading'>Confirm Delete</p>
            <p className='subheading'>Are you sure you want to remove this spot?</p>
            <button className='deleteSpotYes' onClick={handleDelete}>Yes - Delete Spot</button><br/>
            <button className='deleteSpotNo' onClick={closeModal}>No - Keep Spot</button>
        </div>
    );
}

export default DeleteSpotModal;
