import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spot";
import "./createSpot.css";

// creating a spot
const CreateSpotForm = () => {
  const currUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  // const [errors, setErrors] = useState([]);
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
  const [errors, setErrors] = useState([]);


  const clearErrors = () => {
    setErrors([]);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors([]);

  if (!currUser) {
    setErrors(errors => [...errors, "User must be signed in to create a spot"])
  }

  if (!country.length) {
    setErrors(errors => [...errors, "Country is required"])
  }

  if (!address.length) {
    setErrors(errors => [...errors, "Address is required"])
  }

  if (!city.length) {
    setErrors(errors => [...errors, "City is required"])
  }

  if (!state.length) {
    setErrors(errors => [...errors, "State is required"])
  }

  if (description.length < 30) {
    setErrors(errors => [...errors, "Description needs a minimum of 30 characters"])
  }

  if (!name.length) {
    setErrors(errors => [...errors, "Name is required"])
  }

  if (price < 1) {
    setErrors(errors => [...errors, "Price is required"])
  }

  if (!previewImage.length) {
    setErrors(errors => [...errors, "Preview image is required"])
  } else if (!previewImage.endsWith(".png") && !previewImage.endsWith(".jpg") && !previewImage.endsWith(".jpeg")) {
    setErrors(errors => [...errors, "Image URL must end in .png, .jpg, or .jpeg"])
  }

  if (imgUrl1.length && !imgUrl1.endsWith(".png") && !imgUrl1.endsWith(".jpg") && !imgUrl1.endsWith(".jpeg")) {
    setErrors(errors => [...errors, "Image URL must end in .png, .jpg, or .jpeg"])
  }

  if (imgUrl2.length && !imgUrl2.endsWith(".png") && !imgUrl2.endsWith(".jpg") && !imgUrl2.endsWith(".jpeg")) {
    setErrors(errors => [...errors, "Image URL must end in .png, .jpg, or .jpeg"])
  }

  if (imgUrl3.length && !imgUrl3.endsWith(".png") && !imgUrl3.endsWith(".jpg") && !imgUrl3.endsWith(".jpeg")) {
    setErrors(errors => [...errors, "Image URL must end in .png, .jpg, or .jpeg"])
  }

  if (imgUrl4.length && !imgUrl4.endsWith(".png") && !imgUrl4.endsWith(".jpg") && !imgUrl4.endsWith(".jpeg")) {
    setErrors(errors => [...errors, "Image URL must end in .png, .jpg, or .jpeg"])
  }

  if (errors.length === 0) {
    return await dispatch(spotActions.createSpot({
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      previewImage,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4
    }))
      .then(() => {
        history.push("/")
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      })
  } else {
    return;
  }
};




  return (
    <div className="bs">
      <h1>Add a Spot</h1>
      <h2>Where's your place located?</h2>
      <p>Guests will only get your exact address once they book a reservation.</p>
      {errors.length > 0 && (
        <div>
          {errors.map((error, idx) => <p key={idx}>{error}</p>)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country</label>
        {errors.country && <p>{errors.country}</p>}
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />

        <label htmlFor="address">Address</label>
        {errors.address && <p>{errors.address}</p>}
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="city">City</label>
        {errors.city && <p>{errors.city}</p>}
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="state">State</label>
        {errors.state && <p>{errors.state}</p>}
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />

        <label htmlFor="description">Description</label>
        {errors.description && <p>{errors.description}</p>}
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="name">Name</label>
        {errors.name && <p>{errors.name}</p>}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="price">Price</label>
        {errors.price && <p>{errors.price}</p>}
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="previewImage">Add an Image</label>
        {errors.previewImage && <p>{errors.previewImage}</p>}
        <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />

        <label htmlFor="imgUrl1">Add an Image</label>
        {errors.imgUrl1 && <p>{errors.imgUrl1}</p>}
        <input type="text" value={imgUrl1} onChange={(e) => setimgUrl1(e.target.value)} />

        <label htmlFor="imgUrl2">Add an Image</label>
        {errors.imgUrl2 && <p>{errors.imgUrl2}</p>}
        <input type="text" value={imgUrl2} onChange={(e) => setimgUrl2(e.target.value)} />

        <label htmlFor="imgUrl3">Add an Image</label>
        {errors.imgUrl3 && <p>{errors.imgUrl3}</p>}
        <input type="text" value={imgUrl3} onChange={(e) => setimgUrl3(e.target.value)} />

        <label htmlFor="imgUrl4">Add an Image</label>
        {errors.imgUrl4 && <p>{errors.imgUrl4}</p>}
        <input type="text" value={imgUrl4} onChange={(e) => setimgUrl4(e.target.value)} />

        <button type="Create">Submit</button>
      </form>
    </div>
  );










  // return (
  //   <div>
  //     <h1>Add a Spot</h1>
  //     <h2>Where's your place located?</h2>
  //     <p>Guests will only get your exact address once they booked a reservation.</p>
  //     {errors.length > 0 && (
  //       <div>
  //         {errors.map((error, idx) => <p key={idx}>{error}</p>)}
  //       </div>
  //     )}
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="country" >Country</label>
  //       <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />

  //       <label htmlFor="address">Address</label>
  //       <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

  //       <label htmlFor="city">City</label>
  //       <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

  //       <label htmlFor="state">State</label>
  //       <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
  //       <label htmlFor="description">Description</label>
  //       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
  //       <label htmlFor="name">Name</label>
  //       <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  //       <label htmlFor="price">Price</label>
  //       <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
  //       <label htmlFor="previewImage">Add an Image</label>
  //       <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
  //       <label htmlFor="imgUrl1">Add an Image</label>
  //       <input type="text" value={imgUrl1} onChange={(e) => setimgUrl1(e.target.value)} />
  //       <label htmlFor="imgUrl2">Add an Image</label>
  //       <input type="text" value={imgUrl2} onChange={(e) => setimgUrl2(e.target.value)} />
  //       <label htmlFor="imgUrl3">Add an Image</label>
  //       <input type="text" value={imgUrl3} onChange={(e) => setimgUrl3(e.target.value)} />
  //       <label htmlFor="imgUrl4">Add an Image</label>
  //       <input type="text" value={imgUrl4} onChange={(e) => setimgUrl4(e.target.value)} />
  //       <button type="Create">Submit</button>
  //     </form>
  //   </div>
  // );



  // return (
  //   <div>
  //     <h1>Add a Spot</h1>
  //     <h2>Where's your place located?</h2>
  //     <p>Guests will only get your exact address once they booked a reservation.</p>
  //     <form>
  //       <label htmlFor="city">City</label>
  //       <input type="text" value={country} />
  //       <label>Address</label><input type="text" />
  //       <label>City<input type="text" /></label>
  //       <label>State<input type="text" /></label>
  //       <label>Description<input type="text" /></label>
  //       <label>Name<input type="text" /></label>
  //       <label>Price<input type="number" /></label>
  //       <label>Add an Image<input type="text" /></label>
  //       <label>Add an Image<input type="text" /></label>
  //       <label>Add an Image<input type="text" /></label>
  //       <label>Add an Image<input type="text" /></label>
  //       <button type="Create">Submit</button>
  //     </form>
  //   </div>
  // )

 }

export default CreateSpotForm


// { <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />}
