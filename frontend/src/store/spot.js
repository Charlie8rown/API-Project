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


// Thunk Get all Spots
export const getSpot = () => async (dispatch) => {
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
  const spotData = await response.jsion();

  dispatch(loadOneSpot(spotData))
  return spotData
}

// Thunk Create Spot
export const addSpot = (spots, spotImages) => async (dispatch) => {

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spots)
  })

  if (response.ok) {
    const data = await response.json();
    const spotId = data.id;

    const imageResponse = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      body: JSON.stringify
    })

    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      const combined = {...data, preview: imageData.url};

      combined.avgRating = "No reviews are found"
      dispatch(createSpots(combined))
      return combined;
    }
  }
}

// Thunk to edit a spot
export const editSpots = (spots) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spots.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spots)
  })

  if (response.ok) {
    const data = await response.json()

    dispatch(updateSpots(data))
    return data
  }
}


// Thunk to delete a spot
export const deleteSpots = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: 'DELETE'
  })
  if (response.ok) {
      const data = await response.json()
      dispatch(removeSpots(data))
      return data
  }
}

const initialState = { allSpots: {}, singleSpot: {}, userSpecificSpots: {}}

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
      case ADD_SPOTS:
          newState = {...state}
          let copy = {...newState.allSpots}
          copy[action.payload.id] = action.payload
          newState.allSpots = copy
          return newState
      case EDIT_SPOTS:
          let updateSingleSpot = {...state.singleSpot, ...action.payload}
          return {...state,singleSpot: updateSingleSpot}
      case DELETE_SPOTS:
          newState = {...state, singleSpot: {...state.singleSpot}}
          delete newState.singleSpot[action.payload.id]
          return newState
      default:
          return state
  }
}
