import React, {useState} from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spot";

// Modal for creating a spot
function createSpot() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [desription, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    return
  }
//   return (
//     <>
//       <h1>Add a Spot</h1>
//         <form onSubmit={handleSubmit}>
//         <ul>
//           <label></label>
//           <label></label>
//           <label></label>
//           <label></label>
//           <label></label>
//           <label></label>
//           <label></label>
//         </ul>
//       </form>
//     </>
//   )

 }

export default createSpot
