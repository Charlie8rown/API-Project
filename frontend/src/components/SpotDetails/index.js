import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SpotDeatils = () => {
  const { id } = useParams();
  const spotDeatils = useSelector(state => state.spot.entries[id]);

  return (
    <div>
      <h1>{spotDeatils.name}</h1>
      <p>{spotDeatils.address}, {spotDeatils?.city}, {spotDeatils.state}, {spotDeatils.country}</p>
      <p>{spotDeatils.desription}</p>
      <img src={spotDeatils.previewIamge} alt={spotDeatils.name} />
      <p>Average Rating: {spotDeatils.avgRating}</p>
    </div>
  )

}

export default SpotDeatils
