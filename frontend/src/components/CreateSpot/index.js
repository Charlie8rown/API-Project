import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spot";
import "./createSpot.css";

// creating a spot
const CreateSpotForm = () => {
  // const currUser = useSelector(state => state.session.user)
  // const history = useHistory()
  // const [errors, setErrors] = useState([]);
  // const [country, setCountry] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [description, setDescription] = useState("");
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [previewImage, setPreviewImage] = useState("")
  // const [imgUrl1, setimgUrl1] = useState("")
  // const [imgUrl2, setimgUrl2] = useState("")
  // const [imgUrl3, setimgUrl3] = useState("")


  // const handleSubmit = (e) => {
  //   e.preventDefault();


  // };


  return (
    <div>
      <h1>Add a Spot</h1>
      <h2>Where's your place located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <form>
        <label>Country</label>
        <label>Address</label><input type="text" />
        <label>City<input type="text" /></label>
        <label>State<input type="text" /></label>
        <label>Description<input type="text" /></label>
        <label>Name<input type="text" /></label>
        <label>Price<input type="number" /></label>
        <label>Add an Image<input type="text" /></label>
        <label>Add an Image<input type="text" /></label>
        <label>Add an Image<input type="text" /></label>
        <label>Add an Image<input type="text" /></label>
        <button type="Create">Submit</button>
      </form>
    </div>
  )

 }

export default CreateSpotForm
