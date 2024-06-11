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
        <div className='deleteSpotModal'>
            <h1 className='heading'>Confirm Delete</h1>
            <h4 className='subheading'>Are you sure you want to remove this spot?</h4>
            <button className='deleteYes' onClick={handleDelete}>Yes - Delete Spot</button><br/>
            <button className='deleteNo' onClick={closeModal}>No - Keep Spot</button>
        </div>
    );
}

export default DeleteSpotModal;
