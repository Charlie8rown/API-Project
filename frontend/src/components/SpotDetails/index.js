import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSingleSpot } from "../../store/spot";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const SpotDetails = useSelector(state => state.spot.entries[id]);

  useEffect(() => {
    dispatch(getSingleSpot(id))
  }, [dispatch, id])

  return (
    <div>
      <h1>{SpotDetails.name}</h1>
      <p>{SpotDetails.address}, {SpotDetails?.city}, {SpotDetails.state}, {SpotDetails.country}</p>
      <p>{SpotDetails.desription}</p>
      <img src={SpotDetails.previewIamge} alt={SpotDetails.name} />
      <p>Average Rating: {SpotDetails.avgRating}</p>
    </div>
  )
}

export default SpotDetails
