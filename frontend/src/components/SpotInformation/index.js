import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleSpot } from "../../store/spot";
import { clearSpot } from "../../store/spot";
import "./SpotInformation.css"

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotInfo = useSelector(state => state.spot.singleSpot)

  useEffect(() => {
    dispatch(getSingleSpot(spotId))
    return () => dispatch(clearSpot())
  }, [dispatch, spotId]);

  // makes sures to conditionally renders the spot
  if (!spotInfo || !spotInfo.name) {
    return <p>No information for this spot at the moment. Please come back at later time.</p>
  }

  return (
    <div>
      <h1>{spotInfo.name}</h1>
      <h3>{spotInfo.city}, {spotInfo.state}, {spotInfo.country}</h3>
      <h3>{spotInfo.desription}</h3>
      <h3>{spotInfo.price}</h3>
      <spotImages images={spotInfo.SpotImages} />
      {/* {spotInfo.SpotImages.map((img) => {
        return <img src={img.url} alt={spotInfo.name} key={img.id}></img>
      })} */}
      {/* <img src={spotInfo.previewImage} alt={spotInfo.name} /> */}
      <h3>Average Rating: {spotInfo.avgRating}</h3>
    </div>
  )
}

export default SpotDetails
