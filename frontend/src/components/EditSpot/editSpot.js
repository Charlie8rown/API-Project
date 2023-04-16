import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams,} from "react-router-dom/cjs/react-router-dom.min";
import { currUserSpots, updatingSpot, getOneSpot } from "../../store/spot";
import "./EditSpot.css";

export const EditSpotForm = () => {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spot.singleSpot);
  const { spotId } = useParams();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState([]);
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
      // setPreviewImage(spot.previewImage || "");
    }
  }, [spot]);

  useEffect(() => {
    dispatch(currUserSpots());
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = [];

    if (!currUser) {
      err.push("User must be signed in.");
    }

    if (country.length === 0 || country.length > 25) {
      err.push("Country is required");
    }

    if (address.length === 0 || address.length > 50) {
      err.push("Address is required");
    }

    if (city.length === 0 || city.length > 20) {
      err("City is required");
    }

    if (state.length === 0 || state.length > 20) {
      err.push("State is required");
    }

    if (description.length < 30 || description.length > 300) {
      err.push("Description needs 30 or more characters");
    }

    if (!name.length || name.length > 40) {
      err.push("Name is required");
    }

    if (!Number(price)) {
      err.push("Price is required");
    }
    if (!previewImage.length) {
      err.push("previewImageLength");
    } else if (
      !previewImage.endsWith(".jpg") &&
      !previewImage.endsWith(".jpeg") &&
      !previewImage.endsWith(".png")
    ) {
      err.push("previewImageInvalid");
    }

    // if (
    //   image1.length > 0 &&
    //   !image1.endsWith(".jpg") &&
    //   !image1.endsWith(".jpeg") &&
    //   !image1.endsWith(".png")
    // ) {
    //   err.push("image1");
    // }
    // if (
    //   image2.length > 0 &&
    //   !image2.endsWith(".jpg") &&
    //   !image2.endsWith(".jpeg") &&
    //   !image2.endsWith(".png")
    // ) {
    //   err.push("image2");
    // }
    // if (
    //   image3.length > 0 &&
    //   !image3.endsWith(".jpg") &&
    //   !image3.endsWith(".jpeg") &&
    //   !image3.endsWith(".png")
    // ) {
    //   err.push("image3");
    // }
    // if (
    //   image4.length > 0 &&
    //   !image4.endsWith(".jpg") &&
    //   !image4.endsWith(".jpeg") &&
    //   !image4.endsWith(".png")
    // ) {
    //   err.push("image4");
    // }

    if (err.length) return setErrors(err);

    const newUpdatedSpot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    // const imageArr = [
    //   { url: previewImage, preview: true },
    //   { url: image1, preview: false },
    //   { url: image2, preview: false },
    //   { url: image3, preview: false },
    //   { url: image4, preview: false },
    // ];

      // await dispatch(updatingSpot(newUpdatedSpot, spotId, imageArr));
    const updatedSpot = await dispatch(updatingSpot(newUpdatedSpot, spotId))
      if (updatedSpot){
        history.push(`/spots/${spotId}`)
      };


    // await dispatch(updatingSpot(newUpdatedSpot, spotId, imageArr));
    // await dispatch(updatingSpot({ newUpdatedSpot, spotId, imageArr })).then(
    //   (res) => {
    //     if (res.ok) return res.json();
    //   }
    // );

    // if (updatedSpot) {
    //   return history.push(`/spots/${spotId}`);
    // }

    //     const updatedSpot = await dispatch(updatingSpot({newUpdatedSpot, spotId, imageArr}));
    // if (updatedSpot.ok) {
    //   const result = await updatedSpot.json();
    // perform additional actions with the result here
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Update your Spot</h1>
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <div>
            <label>
              Country
              {errors.includes("Country") ? <p>Country is required</p> : null}
            </label>
          </div>
          <input
            type="text"
            placeholder="Country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div>
            <label>
              Street Address
              {errors.includes("Address") ? <p>Address is required</p> : null}
            </label>
          </div>
          <input
            type="text"
            placeholder="Address"
            id="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>
            <div>
              <label>
                City
                {errors.includes("City") ? <p>City is required</p> : null}
              </label>
              <input
                type="text"
                placeholder="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>
                State
                {errors.includes("State") ? <p>State is required</p> : null}
              </label>
              <input
                type="text"
                placeholder="STATE"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            placeholder="Please write at least 30 characters"
            minLength="30"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.includes("Description") ? (
            <p>Description needs a minimum of 30 characters</p>
          ) : null}
        </div>
        <div>
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.includes("Name") ? (
            <p style={{ color: "#db1709", fontSize: "16px" }}>
              Name is required
            </p>
          ) : null}
        </div>
        <div>
          <h3>Set a base price for your spots</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div>
            <label>$ </label>
            <input
              name="price"
              type="number"
              placeholder="Price per night"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {errors.includes("Price") ? <p>Price is required</p> : null}
          {errors.includes("Negative") ? (
            <p>Price must be greater than $0</p>
          ) : null}
        </div>
        <div>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          {errors.includes("previewImageLength") ? (
            <p>Preview image is required</p>
          ) : null}
          {errors.includes("previewImageInvalid") ? (
            <p>Image URL must be .png, .jpg, or .jpeg</p>
          ) : null}
          {/* <div>
            <input
              type="text"
              placeholder="Image URL"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
            />
            {errors.includes("img1") ? (
              <p>Image URL must be .png, .jpg, or .jpeg</p>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              placeholder="Image URL"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
            {errors.includes("image2") ? (
              <p style={{ color: "#db1709", fontSize: "16px" }}>
                Image URL must be .png, .jpg, or .jpeg
              </p>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              placeholder="Image URL"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
            />
            {errors.includes("image3") ? (
              <p>Image URL must end in .png, .jpg, or .jpeg</p>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              placeholder="Image URL"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
            />
            {errors.includes("image4") ? (
              <p>Image URL must be .png, .jpg, or .jpeg</p>
            ) : null}
          </div> */}
        </div>
        <div>
          <button type="submit">Update Spot</button>
        </div>
      </form>
    </div>
  );
};

export default EditSpotForm;
