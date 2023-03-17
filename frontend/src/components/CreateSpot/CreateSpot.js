import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { createSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './CreateSpot.css';

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const newSpotData = {
      name,
      address,
      city,
      state,
      country,
      description,
      price,
    };

    dispatch(createSpots(newSpotData, previewImage))
      .then((res) => history.push(`/spots/${res.id}`))
      .then(closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      {sessionUser ? (
        <>
          <h1>Form</h1>
          <form onSubmit={handleSubmit}>
            <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
            <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)}/>
            <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)}/>
            <input type="text" placeholder="State" required value={state} onChange={(e) => setState(e.target.value)}/>
            <input type="text" placeholder="Country" required value={country} onChange={(e) => setCountry(e.target.value)}/>
            <textarea placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="number" placeholder="Price" required min="1" max="2000" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <input type="url" placeholder="Preview Image Link" required value={previewImage} onChange={(e) => setPreviewImage(e.target.value)}/>
            <button type="submit">Create New Spot</button>
          </form>
        </>
      ) : (<div>Sorry User must be logged in.</div>)}
    </>
  );
}

export default CreateSpot;
