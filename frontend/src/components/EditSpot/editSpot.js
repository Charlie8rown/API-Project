import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./EditSpot.css";
import { updatingSpot, getOneSpot } from "../../store/spot";

export const EditSpot = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spot.singleSpot);
  const id = spotsObj.id;

  const [country, setCountry] = useState(spotsObj.country);
  const [address, setAddress] = useState(spotsObj.address);
  const [city, setCity] = useState(spotsObj.city);
  const [state, setState] = useState(spotsObj.state);
  const [description, setDescription] = useState(spotsObj.description);
  const [name, setName] = useState(spotsObj.name);
  const [price, setPrice] = useState(spotsObj.price);
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!currUser) {
      setErrors((errors) => [...errors, "User must be signed in."]);
    }

    if (country.length === 0 || country.length > 25) {
      setErrors((errors) => [...errors, "Country is required"]);
      return;
    }

    if (address.length === 0 || address.length > 50) {
      setErrors((errors) => [...errors, "Address is required"]);
      return;
    }

    if (city.length === 0 || city.length > 20) {
      setErrors((errors) => [...errors, "City is required"]);
      return;
    }

    if (state.length === 0 || state.length > 20) {
      setErrors((errors) => [...errors, "State is required"]);
      return;
    }

    if (description.length < 30 || state.length > 300) {
      setErrors((errors) => [
        ...errors,
        "description need 30 or more characters",
      ]);
    }

    if (!name.length || name.length > 40) {
      setErrors((errors) => [...errors, "Name is required"]);
      return;
    }

    if (!Number(price)) {
      setErrors((errors) => [...errors, "Price is required"]);
    }

      updatingSpot({
        id,
        address,
        city,
        state,
        country,
        name,
        description,
        price,
      })

      const updatedSpot = await dispatch(updatingSpot(updatingSpot, id))
        if (updatedSpot) {
            history.push(`/spots/${updatingSpot.id}`);
            return
        }
  };

  return (
    <div>
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit} noValidate>
        <ul className="ul">
          {Array.isArray(errors) &&
            errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <h2>Where's your place located?</h2>
        <h3>
          Guests will only get your exact address once they booked a
          reservation.
        </h3>
        <div>
          <label>
            Country
            <input
              className="input"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type="text"
              // value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <div>
              Mention the best features of your space, any special amentities
              like fafst wifi or parking, and what you love about the
              neighborhood.
            </div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Create a title for your spot
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Set a base price for your spot
            <div>
              Competitive pricing can help your listing stand out and rank
              higher in search reults.
            </div>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              max="100000"
            />
          </label>
          <button type="Create">Create Spot</button>
        </div>
      </form>
    </div>
  );
};

export default EditSpot;
