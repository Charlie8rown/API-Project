import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOTS = "spots/addSpots";
const EDIT_SPOTS = "spots/editSpots";
const DELETE_SPOTS = "spts/deleteSpots";
const LOAD_ONE_SPOT = "spots/oneSpot"
const ADD_SPOT_IMAGES = "spots/ADD_SPOT_IMAGE"

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

export const addSpotImage = (spot, spotImages) => ({
  type: ADD_SPOT_IMAGES,
  payload: { spot, spotImages }
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

// Thunk create a spot
export const createSpot = (spot, spotImages) => async (dispatch)=> {
  const spotOwner = spot.Owner;

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot)
  })

  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));

    const spotImgArr = [];

    for (let spotImg of spotImages) {
      const resImage = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotImg)
      });

      if (resImage.ok) {
        const spotImg = await resImage.json();
        spotImgArr.push(spotImg)
      }
    }
    spot.Owner = spotOwner;

    dispatch(addSpotImage(spot, spotImgArr));
    return spot;
  }
}



// Reducer for get all spots, single spot, create spot
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
    case ADD_SPOTS:
      newState = {...state}
      let copy = {...newState.allSpots}
      copy[action.payload.id] = action.payload
      newState.allSpots = copy
      return newState
  }
}


// Reducer for create spot
