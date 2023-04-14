import { csrfFetch } from "./csrf";
import { getOneSpot } from "./spot";


const REVIEWS = 'ALL_REVIEWS';
const CURR_USER_REVIEWS = 'USER_REVIEWS';
const CREATE_REVIEW = 'CREATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const RESET_REVIEWS = 'RESET_REVIEWS';


// Action Creators
export const allReviews = (reviews) => ({
  type: REVIEWS,
  reviews
});

export const currUserReviews = (reviews) => ({
  type: REVIEWS,
  reviews
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
});

export const resetReviews = (reset) => ({
  type: RESET_REVIEWS,
  reset
});

// Normalize the data
const normalizeAllReviews = (reviews) => {
  let normalized = {};
  reviews.forEach(review => normalized[review.id] = review)
  return normalized;
};


// Thunks
export const getAllReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    const normalized = normalizeAllReviews(reviews.Review);
    console.log("normi", normalized);

    dispatch(allReviews(normalized));
    return normalized;
  };
};

export const getSessionUserReviews = () => async dispatch => {
  const response = await csrfFetch(`/api/reviews/current`);

  if (response.ok) {
    const reviews = await response.json()
    const normalized = normalizeAllReviews(reviews.Reviews)

    dispatch(currUserReviews(normalized));
    return normalized;
  }
}

export const createNewReview = (newReview, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  });

  if (response.ok) {

    dispatch(getAllReviews(spotId)).then(dispatch(getOneSpot(spotId)));
    return;
  };
};

export const deleteCurrUserReview = (reviewId, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`,
    { method: "DELETE" })

  if (response.ok) {
    const data = await response.json();

    dispatch(deleteReview(reviewId));
    dispatch(getOneSpot(spotId));
    return data;
  }
};

export const resetAllReviews = () => async dispatch => {

  dispatch(resetReviews(initialState));
  return;
};

const initialState = { spot: {}, user: {} };

// Review Reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {

    case REVIEWS:{
      return { ...state, spot: action.reviews }
    }

    case CURR_USER_REVIEWS:{
      return { ...state, user: { ...action.reviews } }
    }

    case CREATE_REVIEW:{
      return {
        ...state,
        spot: { ...state.spot, [action.review.id]: action.review },
        user: { ...state.user, [action.review.id]: action.review }
      }
    }

    case DELETE_REVIEW:{
      const newState = { ...state, spot: { ...state.spot, ...state.user }};
      delete newState.spot[action.reviewId]
      delete newState.user[action.reviewId]
      return newState;
    }

    case RESET_REVIEWS:{
      return action.reset
    }

    default: return state
  };
};

export default reviewReducer;
