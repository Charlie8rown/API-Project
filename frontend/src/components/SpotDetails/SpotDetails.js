import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spot';
// import OpenModalButton from '../OpenModalButton';
import comingSoon from "../../asset/image_coming_soon.jpeg";
import "./SpotDetails.css";

const SpotDetails = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot.singleSpot);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!Object.values(spot).length) return <h1>Loading ...</h1>;

  return (
    <div>Hello there
      <h1>{spot.name}</h1>
      <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      <div>{spot.SpotImages.length > 0 ? (<img src={spot.SpotImages[0].url} alt="none" />) : (<img src={comingSoon} alt="" />)}</div>
      <div>{spot.SpotImages.length > 1 ? (<img src={spot.SpotImages[1].url} alt="none" />) : (<img src={comingSoon} alt="" />)}{spot.SpotImages.length > 2 ? (<img src={spot.SpotImages[2].url} alt=""/>) : (<img src={comingSoon} alt="" />)}</div>
      <div>{spot.SpotImages.length > 3 ? (<img id="image-3" src={spot.SpotImages[3].url} alt="none" />) : (<img src={comingSoon} alt="" />)}{spot.SpotImages.length > 4 ? (<img id="image-4"src={spot.SpotImages[4].url} alt="none" />) : (<img src={comingSoon} alt="" />)}</div>
    </div>
  );
}

export default SpotDetails;
