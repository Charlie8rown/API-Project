import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spot";
import './SpotDetails.css'


const SpotDetail = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spotDetail = useSelector(state => state?.spot?.singleSpot)


    useEffect(() => {
      dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])


    if (!spotDetail || !spotDetail.name || !spotDetail.SpotImages) {
      return <h1>No information for this spot at the moment. Please come back at later time.</h1>
    }

    const rating = (rating) => {
      if (rating < 1) {
        return <p>NEW</p>;
      } else return <p>{spotDetail.avgStarRating}</p>
    };

    return (
      <>
        <h1>{spotDetail.name}</h1>
        <p>{spotDetail.address}, {spotDetail.city}, {spotDetail.state}, {spotDetail.country}</p>
        <div>
          {spotDetail.SpotImages.map((image, index) => (
            <img src={image.url} alt={`${spotDetail.name}-${index}`} key={index} />
          ))}
        </div>
        <div>{spotDetail.description}</div>
        <div>${spotDetail.price} per night</div>
        <div>{rating(spotDetail.avgStarRating)}</div>
      </>
    );

}

export default SpotDetail
