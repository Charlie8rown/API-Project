import Spots from "../components/Spots";
import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOTS = "spots/addSpots";
const EDIT_SPOTS = "spots/editSpots";
const DELETE_SPOTS = "spts/deleteSpots";

export const loadSpots = (Spots) => ({
  type: LOAD_SPOTS,
  payload: spots
})

export const createSpots = (Spots) => ({
  type: ADD_SPOTS,
  payload: spots
})

export const updateSpots = (spots) => ({
  type: EDIT_SPOTS,
  spots
})

export const removeSpots = () => ({
  type: DELETE_SPOTS
})

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spot")
}


// Thunk Get all Spots
export const getSpot = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();

  dispatch(loadSpots(data))
  return response
}

// Thunk Create Spot
export const addSpot = (spots) => async (dispatch) => {
  const {address, city, state, country, name, description, price} = spots
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    body: JSON.stringigy({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  })
  const data = await response.json();

  dispatch(createSpots(data.spots))
  return response;
}

// Takes in an array and return an object with the spot id as a keya nd obj as a value.
// I can access the data.
const normalize = (spots) => {
  const normalizeObj = {};

  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    normalizeObj[spot.id] = spots
  }
  return normalizeObj
}
