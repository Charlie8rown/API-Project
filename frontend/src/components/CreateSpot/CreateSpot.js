import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpots, getSpots } from "../../store/spot";
import './CreateSpot.css'

const AddSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(createSpots({address, city, state, country, name, description, price, url, preview: true}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
            .then(() => dispatch(getSpots()))
        history.push('/');
    }

    return (
        <div className="form-container">
        <h1>List A New Spot</h1>
        <form className="spot-form" onSubmit={handleSubmit}>
            <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Address
                <input
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            <label>
                City
                <input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            <label>
                State
                <input
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            <label>
                Country
                <input
                placeholder="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            <label>
                Spot Name
                <input
                placeholder="Spot Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            <label>
                Price per night
                <input
                placeholder="Price Per-Night"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={"1"}
                required
                />
            </label>
            <label>
                Image url
                <input
                placeholder="Image Url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                />
            </label>
            <label>
                Description
                <textarea
                placeholder="Description goes here"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 required/>
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default AddSpotForm;
