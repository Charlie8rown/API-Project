import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleSpot } from "../../store/spot";
import "./SpotInformation.css"

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotInfo = useSelector(state => state.spot.singleSpot)

  useEffect(() => {
    dispatch(getSingleSpot(spotId))
  }, [dispatch, spotId])

  if (!spotInfo || !spotInfo.name) {
    <p>No information for this spot at the moment. Please come back at later time.</p>
  }

  return (
    <div>
      <h1>{spotInfo.name}</h1>
      <h3>{spotInfo.address}, {spotInfo.city}, {spotInfo.state}, {spotInfo.country}</h3>
      <h3>{spotInfo.desription}</h3>
      <h3>{spotInfo.price}</h3>
      {spotInfo.SpotImages.map((img, i) => {
        return <img src={img.url} alt={spotInfo.name} />
      })}
      <img src={spotInfo.previewImage} alt={spotInfo.name} />
      <h3>Average Rating: {spotInfo.avgRating}</h3>
    </div>
  )
}

export default SpotDetails
