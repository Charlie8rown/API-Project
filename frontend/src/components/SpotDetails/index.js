import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleSpot } from "../../store/spot";
import "./spotDetails.css"

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spotDetails = useSelector(state => state.spot.singleSpot);

  useEffect(() => {
    dispatch(getSingleSpot(id))
  }, [dispatch, id])

  return (
    <div>
      <h1>{spotDetails.name}</h1>
      <p>{spotDetails.address}, {spotDetails?.city}, {spotDetails.state}, {spotDetails.country}</p>
      <p>{spotDetails.desription}</p>
      <img src={spotDetails.previewIamge} alt={spotDetails.name} />
      <p>Average Rating: {spotDetails.avgRating}</p>
    </div>
  )
}

export default SpotDetails
