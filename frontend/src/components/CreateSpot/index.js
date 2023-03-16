import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spot";
import "./createSpot.css";

// creating a spot
const CreateSpotForm = () => {
  const currUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("")
  const [imgUrl1, setimgUrl1] = useState("")
  const [imgUrl2, setimgUrl2] = useState("")
  const [imgUrl3, setimgUrl3] = useState("")
  const [imgUrl4, setimgUrl4] = useState("")

  if(!currUser) history.push("/");

  useEffect(() => {
    const errors = {};

    if (country.length < 2 || country.length > 60) {
      errors.country = "Country is required";
    }

    if (!address.length) {
      errors.address = "Address is required";
    }

    if (!city.length) {
      errors.city = "City is required";
    }

    if (!state.length) {
      errors.state = "State is required";
    }

    if (description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }

    if (!name.length) {
      errors.name = "Name is required";
    }

    if (price < 1) {
      errors.price = "Price is required";
    }

    if (!previewImage.length) {
      errors.previewImage = "Preview image is required";
    } else if (previewImage.endsWith(".png") && previewImage.endsWith(".jpg") && previewImage.endsWith(".jpeg")){
      errors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (imgUrl1) {
      if (!(imgUrl1.endsWith(".png") || imgUrl1.endsWith(".jpg") || imgUrl1.endsWith(".jpeg"))) {
        errors.imgUrl1 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    };

    if (imgUrl2) {
      if (!(imgUrl2.endsWith(".png") || imgUrl2.endsWith(".jpg") || imgUrl2.endsWith(".jpeg"))) {
        errors.imgUrl2 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    };

    if (imgUrl3) {
      if (!(imgUrl3.endsWith(".png") || imgUrl3.endsWith(".jpg") || imgUrl3.endsWith(".jpeg"))) {
        errors.imgUrl3 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    };

    if (imgUrl4) {
      if (!(imgUrl4.endsWith(".png") || imgUrl4.endsWith(".jpg") || imgUrl4.endsWith(".jpeg"))) {
        errors.imgUrl4 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    };


    setErrors(errors)
  }, [country, address, city, state, description, name, price, previewImage, imgUrl1, imgUrl2, imgUrl3, imgUrl4])


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);

    const newSpot = { country, address, city, state, description, name, price }

    const spotImages = [{url: previewImage, preview: true}];
      if (imgUrl1) spotImages.push({url: imgUrl1, preview: false});
      if (imgUrl2) spotImages.push({url: imgUrl2, preview: false});
      if (imgUrl3) spotImages.push({url: imgUrl3, preview: false});
      if (imgUrl4) spotImages.push({url: imgUrl4, preview: false});


      // If there is are any errors  it will not dispatch.
      if (Object.keys(errors).length > 0) {
        window.alert("Fix errors before creating spot!");
        return
      };

      if (newSpot) {
        const newestSpot = await dispatch(spotActions.createSpot(newSpot, spotImages));

        setSubmit(false);
        history.push(`/spots/${newestSpot.dispatch}`);
      }

      setCountry("");
      setAddress("");
      setCity("");
      setState("");
      setDescription("");
      setName("");
      setPrice("");
      setPreviewImage("");
      setimgUrl1("");
      setimgUrl2("");
      setimgUrl3("");
      setimgUrl4("");
  };

  return (
    <div>
      <h1>Create a Spot</h1>
      <h2>Where's your place located?</h2>
      <p>Guests will only get your exact address once they book a reservation.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country {<span className={submit ? "error" : "hidden"}>{errors.country}</span>}</label>
        <input type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />

        <label htmlFor="address">address {<span className={submit ? "error" : "hidden"}>{errors.address}</span>}</label>
        <input type="text" value={address} placeholder="address" onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="city">city {<span className={submit ? "error" : "hidden"}>{errors.city}</span>}</label>
        <input type="text" value={city} placeholder="city" onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="state">state {<span className={submit ? "error" : "hidden"}>{errors.state}</span>}</label>
        <input type="text" value={state} placeholder="state" onChange={(e) => setState(e.target.value)} />

        <label htmlFor="description">description {<span className={submit ? "error" : "hidden"}>{errors.description}</span>}</label>
        <input type="text" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="name">name {<span className={submit ? "error" : "hidden"}>{errors.name}</span>}</label>
        <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />

        <label htmlFor="price">price {<span className={submit ? "error" : "hidden"}>{errors.price}</span>}</label>
        <input type="text" value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="previewImage">previewImage {<span className={submit ? "error" : "hidden"}>{errors.previewImage}</span>}</label>
        <input type="text" value={previewImage} placeholder="previewImage" onChange={(e) => setPreviewImage(e.target.value)} />

        <label htmlFor="imgUrl1">imgUrl1 {<span className={submit ? "error" : "hidden"}>{errors.imgUrl1}</span>}</label>
        <input type="text" value={imgUrl1} placeholder="imgUrl1" onChange={(e) => setimgUrl1(e.target.value)} />

        <label htmlFor="imgUrl2">imgUrl2 {<span className={submit ? "error" : "hidden"}>{errors.imgUrl2}</span>}</label>
        <input type="text" value={imgUrl2} placeholder="imgUrl2" onChange={(e) => setimgUrl2(e.target.value)} />

        <label htmlFor="imgUrl3">imgUrl3 {<span className={submit ? "error" : "hidden"}>{errors.imgUrl3}</span>}</label>
        <input type="text" value={imgUrl3} placeholder="imgUrl3" onChange={(e) => setimgUrl3(e.target.value)} />

        <label htmlFor="imgUrl4">imgUrl4 {<span className={submit ? "error" : "hidden"}>{errors.imgUrl4}</span>}</label>
        <input type="text" value={imgUrl4} placeholder="imgUrl4" onChange={(e) => setimgUrl4(e.target.value)} />

        <button type="Create">Submit</button>
      </form>
    </div>
  );
}

export default CreateSpotForm
