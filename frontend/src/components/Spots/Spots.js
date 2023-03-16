import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../../store/spot";
import SpotIndex from "../SpotIndex/SpotIndex";
import "./Spots.css";


const Spots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spot.allSpots);
  const allSpotsArr = Object.values(allSpots);

  useEffect(() => {
      dispatch(getSpots())
  }, [dispatch]);

  if (!allSpots) return null;

  const spotItems = allSpotsArr.map((spot) => {
      return <SpotIndex key={spot.id} spot={spot} />
  })

  return (
    <div className="spots-container">
      <ul className="spots-wrapper">
        {spotItems}
      </ul>
    </div>
  )
};

export default Spots;
