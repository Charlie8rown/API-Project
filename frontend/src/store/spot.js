import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOTS = "spots/addSpots";
const EDIT_SPOTS = "spots/editSpots";
const DELETE_SPOTS = "spts/deleteSpots";
const LOAD_ONE_SPOT = 'spots/oneSpot'

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots
})

export const loadOneSpot = (spots) => ({
  type: LOAD_ONE_SPOT,
  payload: spots
})

export const createSpots = (spots) => ({
  type: ADD_SPOTS,
  payload: spots
})

export const updateSpots = (spots) => ({
  type: EDIT_SPOTS,
  payload: spots
})

export const removeSpots = (id) => ({
  type: DELETE_SPOTS,
  payload: id
})


// Thunk Get all Spots with spot details
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();

    dispatch(loadSpots(data))
    return data
  }
}

// Thunk get just one spot
export const getSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spotData = await response.json();

  dispatch(loadOneSpot(spotData))
  return spotData
}


// Reducer for get all spots and single spot
const initialState = { allSpots: {}, singleSpot: {}}

export const spotsReducer = (state = initialState, action) => {
  let newState;

  switch(action.type) {
    case LOAD_SPOTS:
      newState = {...state}
      newState = { allSpots: {}, singleSpot: {}}
      action.payload.Spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      });
      return newState
    case LOAD_ONE_SPOT:
      newState = {...state}
      newState.singleSpot = action.payload
      return newState
    default:
      return state

  }
}
