import './DeleteSpot.css';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spots';

const DeleteSpotModal = ({spot}) => {
    const spotId = spot.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId)).then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          });
        history.push('/spots/current');
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
