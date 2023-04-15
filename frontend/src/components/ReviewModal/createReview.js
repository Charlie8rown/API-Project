import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { createNewReview } from "../../store/review";
import { useModal } from "./Modal";

const CreateReviewForm = (id) => {
  const spotId = id;
  const dispatch = useDispatch();
  const history = useHistory();
  const starId = ["fa-regular fa-star", "fa-solid fa-star"];
  const [review, setReview] = useState("");
  const [star, setStar] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newReview = await dispatch(createNewReview(review, spotId, user));
      (closeModal())
      .catch(async (res) => {
        const data = await res.json();
        setErrors([data.message]);
      });

    if (newReview) {
      history.push(`/spots/${spotId}`);
    }
  };

  useEffect(() => {
    const err = [];
    if (star === 0) {
      err.push("Star value must be greater than 0");
    }
    setErrors(err);
  }, [star, review]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>How was your stay?</h1>
        {showReview && showStars ? (
          errors.map((error, idx) => <p key={idx}>{error}</p>)
        ) : (
          <></>
        )}
        <div>
          <textarea
            value={review}
            onClick={() => setShowReview(true)}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review here."
          />
        </div>
        <div onClick={() => setShowStars(true)}>
          <div onClick={() => setStar(1)}>
            {star > 0 ? (
              <i className={starId[1]} />
            ) : (
              <i className={starId[0]} />
            )}
          </div>
          <div onClick={() => setStar(2)}>
            {star > 1 ? (
              <i className={starId[1]} />
            ) : (
              <i className={starId[0]} />
            )}
          </div>
          <div onClick={() => setStar(3)}>
            {star > 2 ? (
              <i className={starId[1]} />
            ) : (
              <i className={starId[0]} />
            )}
          </div>
          <div onClick={() => setStar(4)}>
            {star > 3 ? (
              <i className={starId[1]} />
            ) : (
              <i className={starId[0]} />
            )}
          </div>
          <div onClick={() => setStar(5)}>
            {star > 4 ? (
              <i className={starId[1]} />
            ) : (
              <i className={starId[0]} />
            )}
          </div>
          <p>&nbsp; Stars</p>
        </div>
        <button type="submit" disabled={errors.length ? true : false}>
          Submit Your Review
        </button>
      </div>
    </form>
  );
};

export default CreateReviewForm;
