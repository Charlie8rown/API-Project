import React, {useState} from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spot";

// Modal for creating a spot
function createSpot() {
  const dispatch = useDispatch();
  const [] = useState("");
  const [] = useState("");
  const [] = useState("");
  const [] = useState("");
  const [] = useState("");
  const [] = useState("");
  const [] = useState("");

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

// }

export default createSpot
