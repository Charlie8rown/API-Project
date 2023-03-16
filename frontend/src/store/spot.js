import { csrfFetch } from "./csrf";

const LOAD_ALL = "";
const LOAD_ONE = "";
const CREATE_SPOT = "";
const UPDATE_SPOT = "";
const DELETE = "";

// Action Creators
const loadAll = (spots) => ({
  type: LOAD_ALL,
  spots
})

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot
})

// const createSpot = (spot) => ({
//   type: CREATE_SPOT,
//   spot
// })

// const updateSpot = (spot) => ({
//   type: UPDATE_SPOT,
//   spot
// })

// const deleteSpot = (spotId) => ({
//   type: DELETE,
//   spotId
// })



// Thunk Actions
export const getSpots = (payload) => async dispatch => {
  const res = await csrfFetch("/api/spots");

  if(res.ok) {
    const spots = await res.json();
    dispatch(loadAll(spots));
    return spots;
  }
};

export const getOneSpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
      const spot = await res.json();
      dispatch(loadOne(spot));
      return spot;
  }
};

// export const postSpot = (payload) => async dispatch => {

//   return spot
// }

// export const removeSpot = (id) => async dispatch => {

//   return response
// }

// export const putSpot = (payload => async dispatch => {

//   return response
// })

// Spot Reducer
const initialState = {allSpots: {}, singleSpot: {}};

export default function spotReducer (state = initialState, action) {
  let newState = {...state}
  switch(action.type) {
    case LOAD_ALL:
    newState = { allSpots: {}, singleSpot: {} }
    action.spots.Spots.forEach(spot => {
    });
    return newState

    case LOAD_ONE: {
      return { ...state, singleSpot: action.spot }
    }
    case CREATE_SPOT: {
      newState.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
      return newState;
    }
    default:
      return state
  }
};
