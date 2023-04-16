import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpots, getOneSpot  } from "../../store/spot";
import "./createSpot.css";

// creating a spot

const CreateSpotForm = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imgUrl1, setimgUrl1] = useState("");
  const [imgUrl2, setimgUrl2] = useState("");
  const [imgUrl3, setimgUrl3] = useState("");
  const [imgUrl4, setimgUrl4] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      previewImage,
    };

    let imageList =[];
    if (previewImage) {
        const newImage = {
            preview: true,
            url: previewImage
        };
        imageList.push(newImage)
    }

    if (imgUrl1) {
        const addImage1 = {
            preview: false,
            url: imgUrl1
        }
        imageList.push(addImage1)
    };
    if (imgUrl2) {
        const addImage2 = {
            preview: false,
            url: imgUrl2
        }
        imageList.push(addImage2)
    };
    if (imgUrl3) {
        const addImage3 = {
            preview: false,
            url: imgUrl3
        }
        imageList.push(addImage3)
    };
    if (imgUrl4) {
        const addImage4 = {
            preview: false,
            url: imgUrl4
        }
        imageList.push(addImage4)
    }


    // const spotImages = [imgUrl1, imgUrl2, imgUrl3, imgUrl4].filter(Boolean);

    const errors = {};

    if (!country) {
      errors.country = "Country is required";
    }

    if (!address) {
      errors.address = "Address is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!description) {
      errors.description = "Description is required";
    }

    if (!name) {
      errors.name = "Name is required";
    }

    if (!price) {
      errors.price = "Price is required";
    }

    if (!previewImage) {
      errors.previewImage = "Preview Image is required";
    }

    if (imgUrl1) {
      if (
        !(
          imgUrl1.endsWith(".png") ||
          imgUrl1.endsWith(".jpg") ||
          imgUrl1.endsWith(".jpeg")
        )
      ) {
        errors.imgUrl1 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }

    if (imgUrl2) {
      if (
        !(
          imgUrl2.endsWith(".png") ||
          imgUrl2.endsWith(".jpg") ||
          imgUrl2.endsWith(".jpeg")
        )
      ) {
        errors.imgUrl2 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }

    if (imgUrl3) {
      if (
        !(
          imgUrl3.endsWith(".png") ||
          imgUrl3.endsWith(".jpg") ||
          imgUrl3.endsWith(".jpeg")
        )
      ) {
        errors.imgUrl3 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }

    if (imgUrl4) {
      if (
        !(
          imgUrl4.endsWith(".png") ||
          imgUrl4.endsWith(".jpg") ||
          imgUrl4.endsWith(".jpeg")
        )
      ) {
        errors.imgUrl4 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }

    setErrors(errors);
    // setSubmit(true);

    if (Object.keys(errors).length === 0) {
      try {
        const newestSpot = await dispatch(
          createSpots(newSpot, imageList)
        );
          const newSpotId = newestSpot.map(spot => spot.id)
        // setSubmit(false);
        history.push(`/spots/${newSpotId}`);
      } catch (error) {
        console.log(error);
      }
    }

    // if (Object.keys(errors).length === 0) {
    //   // try {
    //     const newestSpot = await dispatch(
    //       createSpots(newSpot, imageList)
    //     )
    //     // setSubmit(false);
    //     history.push(`/spots`)
    //     history.push(`/spots/${newestSpot.id}`);
    //   // }
    //   // catch (error) {
    //   //   console.log(error);
    //   // }
    // }
  };

  // if (Object.keys(errors).length > 0) {
  //   window.alert("Fix errors before creating spot!");
  //   return;

  //   // setCountry("");
  //   // setAddress("");
  //   // setCity("");
  //   // setState("");
  //   // setDescription("");
  //   // setName("");
  //   // setPrice("");
  //   // setPreviewImage("");
  //   // setimgUrl1("");
  //   // setimgUrl2("");
  //   // setimgUrl3("");
  //   // setimgUrl4("");
  // }

  return (
    <div className="create-spot-form-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        {errors.country && <div className="error">{errors.country}</div>}
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.address && <div className="error">{errors.address}</div>}
        <div style={{display: "flex"}}>
          <label style={{marginRight: "10px"}}>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          {errors.city && <div className="error">{errors.city}</div>}
          <label>
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        {errors.state && <div className="error">{errors.state}</div>}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <div className="error">{errors.name}</div>}
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {errors.price && <div className="error">{errors.price}</div>}
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && (
          <div className="error">{errors.description}</div>
        )}
        <label>
          Preview Image URL:
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        {errors.previewImage && (
          <div className="error">{errors.previewImage}</div>
        )}
        <label>
          Image URL 1:
          <input
            type="text"
            value={imgUrl1}
            onChange={(e) => setimgUrl1(e.target.value)}
          />
        </label>
        {errors.imgUrl1 && <div className="error">{errors.imgUrl1}</div>}
        <label>
          Image URL 2:
          <input
            type="text"
            value={imgUrl2}
            onChange={(e) => setimgUrl2(e.target.value)}
          />
        </label>
        {errors.imgUrl2 && <div className="error">{errors.imgUrl2}</div>}
        <label>
          Image URL 3:
          <input
            type="text"
            value={imgUrl3}
            onChange={(e) => setimgUrl3(e.target.value)}
          />
        </label>
        {errors.imgUrl3 && <div className="error">{errors.imgUrl3}</div>}
        <label>
          Image URL 4:
          <input
            type="text"
            value={imgUrl4}
            onChange={(e) => setimgUrl4(e.target.value)}
          />
        </label>
        {errors.imgUrl4 && <div className="error">{errors.imgUrl4}</div>}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
