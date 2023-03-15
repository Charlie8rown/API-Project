import React, {useState} from "react";
import { useDispatch } from "react-redux";
import * as spotActions from "../../store/spot";
import "./createSpot.css";

// creating a spot
const createSpot = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [desription, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [previewImage, setPreviewImage] = useState("")
  const [imgUrl1, setimgUrl1] = useState("")
  const [imgUrl2, setimgUrl2] = useState("")
  const [imgUrl3, setimgUrl3] = useState("")

  const handleSubmit = (e) => {
    // e.preventDefault();

    // return
  }


  return (
    <>
      <h1>Add a Spot</h1>
          <h2>Where's your place located?</h2>
          <h3>Guests will only get your exact address once they booked a reservation.</h3>
        <form onSubmit={handleSubmit}>
        <ul>
          <label>Country<input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/></label>
          <label>Adress<input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/></label>
          <label>City<input type="text" value={city} onChange={(e) => setCity(e.target.value)}/></label>
          <label>State<input type="text" value={state} onChange={(e) => setState(e.target.value)}/></label>
          <label>Description<input type="text" value={desription} onChange={(e) => setDescription(e.target.value)}/></label>
          <label>Name<input type="text" value={name} onChange={(e) => setName(e.target.value)}/></label>
          <label>Price<input type="number" value={price}  onChange={(e) => setPrice(e.target.value)} min="1" max="1000000"/></label>
          <label>Add an Image<input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)}/></label>
          <label>Add an Image<input type="text" value={imgUrl1} onChange={(e) => setimgUrl1(e.target.value)}/></label>
          <label>Add an Image<input type="text" value={imgUrl2} onChange={(e) => setimgUrl2(e.target.value)}/></label>
          <label>Add an Image<input type="text" value={imgUrl3} onChange={(e) => setimgUrl3(e.target.value)}/></label>
          <button type="Create">Submit</button>
        </ul>
      </form>
    </>
  )

 }

export default createSpot
