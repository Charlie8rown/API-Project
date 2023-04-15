import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import StarRating from "./starRating";
import "./ReviewModal.css";

function ReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState({});
  const [reviewButton, setReviewButton] = useState(
    "submit-review-button-disabled"
  );
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (review.length > 255) {
      errors.review = "Review must be less than 255 characters";
      setErrors(err);
      return;
    }

    const newReview = {
      review,
      stars: rating,
    };

    dispatch(createNewReview(newReview, spotId));
    closeModal();
  };

  const disabled = () => {
    if (review.length < 10) return true;
    if (!rating) return true;
    return false;
  };

  useEffect(() => {
    if (review.length > 9 && rating) {
      setReviewButton("submit-review-button-enabled");
    }
  }, [rating, review]);

  return (
    <div>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        {errors.review ? (
          <div>
            {errors.review}
          </div>
        ) : null}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="8"
          cols="50"
          placeholder="Leave your review here..."
        ></textarea>
        <div>
          <StarRating
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
          <p>Stars</p>
        </div>
        <div>
          <button id={reviewButton} type="submit" disabled={disabled()}>
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewModal;
