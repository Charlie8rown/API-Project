import "./SpotsIndex.css";
import { Link } from "react-router-dom";

const SpotIndex = ({ spot }) => {
  return (
    <div>
      <Link to={`/spots/${spot.id}`}>
        <img src={spot.previewImage} alt={spot.name} />
        <div>
          <span>
            {spot.city}, {spot.state}
          </span>
        </div>
        <div>
          <span>${spot.price} </span>
          <span>night</span>
        </div>
      </Link>
    </div>
  );
};

export default SpotIndex;
