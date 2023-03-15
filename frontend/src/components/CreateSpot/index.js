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
        <form>
        <ul>
          <label>Adress<input type="text"/></label>
          <label>City<input type="text"/></label>
          <label>State<input type="text"/></label>
          <label>Country<input type="text"/></label>
          <label>Name<input type="text"/></label>
          <label>Description<input type="text"/></label>
          <label>Price<input type="number" min="1" max="1000000"/></label>
          <label>Add an Image<input type="file"/></label>
          <button type="Create">Submit</button>
        </ul>
      </form>
    </>
  )

 }

export default createSpot
