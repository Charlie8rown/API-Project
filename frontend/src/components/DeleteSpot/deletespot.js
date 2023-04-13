import React, { useState } from "react";
import { removeSpot } from "../../store/spot";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteSpot.css';

export const DeleteSpot = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [page, setpage] = useState(false);


  const handleSubmit = async () => {
    dispatch(removeSpot(spotId));
    closeModal();
    setpage(true);
  };




  return (
    <div>
      {page ? (<div>Refreshing...</div>) :
      (<div>
        <h1>Confirm Delete</h1>
        <button onClick={handleSubmit}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>)}
    </div>
  );
}

export default DeleteSpot;
