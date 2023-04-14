import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spot";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../ReviewModal/deleteReview";
import ReviewmModal from "../ReviewModal/reviewModal";
import "./SpotDetails.css";
import { getAllReviews } from "../../store/review";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotDetail = useSelector((state) => state?.spot?.singleSpot);
  const currUser = useSelector((state) => state.session.user);
  const spotReviews = useSelector((state) => state.reviews.spot);
  const arr = Object.values(spotReviews).reverse();
  const currUserReviewId = Object.values(spotReviews).map((review) => review);




  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  if (!spotDetail || !spotDetail.name || !spotDetail.SpotImages) {
    return (
      <h1>
        No information for this spot at the moment. Please come back at later
        time.
      </h1>
    );
  }

  const rating = (rating) => {
    if (rating < 1) {
      return <p>NEW</p>;
    } else return <p>{spotDetail.avgStarRating}</p>;
  };

  function handleClick() {
    alert("Feature Coming Soon");
  }

  return (
    <>
      <h1>{spotDetail.name}</h1>
      <p>
        {spotDetail.city}, {spotDetail.state}, {spotDetail.country}
      </p>
      <div>
        {spotDetail.SpotImages.map((image, index) => (
          <img
            src={image.url}
            alt={`${spotDetail.name}-${index}`}
            key={index}
          />
        ))}
      </div>
      <div>
        Hosted By {spotDetail.Owner.firstName} {spotDetail.Owner.lastName}
      </div>
      <div>{spotDetail.description}</div>
      <div>${spotDetail.price} per night</div>
      <div>{rating(spotDetail.avgStarRating)}</div>
      <div>
        <button onClick={handleClick} id="reserve-button">
          Reserve
        </button>
      </div>
      <p id="rating-review">
        <i className="fa-solid fa-star"></i>
        {spotDetail.numReviews > 1
          ? ` ${parseFloat(spotDetail.avgStarRating).toFixed(1)} · ${
              spotDetail.numReviews
            } reviews`
          : null}
        {spotDetail.numReviews === 1
          ? ` ${parseFloat(spotDetail.avgStarRating).toFixed(1)} · ${
              spotDetail.numReviews
            } review`
          : null}
        {!spotDetail.numReviews ? ` New` : null}
      </p>

      {currUser &&
        spotDetail.Owner.id !== currUser.id &&
        !currUserReviewId.includes(currUser.id) && (
          <div>
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<ReviewmModal spotId={spotId} />}
            />
          </div>
        )}
      {arr.length ? (
        arr.map((review) => (
          <div key={review.id}>
            <p>{ review.User.firstName }</p>
            <p>
              {months[review.createdAt.substring(5, 7) - 1]}{" "}
              {review.createdAt.substr(0, 4)}
            </p>
            <p>{review.review}</p>

            {review.User.id === currUser?.id ? (
              <>
                <div>
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <DeleteReviewModal reviewId={review.id} spotId={spotId} />
                    }
                  />
                </div>
              </>
            ) : null}
            <div
              style={{ borderBottom: "1px solid black", marginBottom: "4px" }}
            ></div>
          </div>
        ))
      ) : (
        <h2>Be the first the post a review!</h2>
      )}
    </>
  );
};

export default SpotDetails;
