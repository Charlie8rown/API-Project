import { csrfFetch } from "./csrf";


// Variables
const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOT = "spots/addSpots";
const EDIT_SPOT = "spots/editSpots";
const DELETE_SPOT = "spts/deleteSpots";
const LOAD_ONE_SPOT = "spots/oneSpot"

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots
})

export const loadOneSpot = (spot) => ({
  type: LOAD_ONE_SPOT,
  payload: spot
})

export const createSpot = (spots) => ({
  type: ADD_SPOT,
  payload: spots
})

export const updateSpot = (spots) => ({
  type: EDIT_SPOT,
  payload: spots
})

export const deleteSpot = (id) => ({
  type: DELETE_SPOT,
  payload: id
})


// Thunk Get all Spots with spot details
export const getAllSpots = () => async dispatch => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const spotsJSON = await response.json();

    spotsJSON.Spots.forEach(spot => {

      if (!spot.avgRating) {
        spot.avgRating = "New"
      }
    })
    console.log(spotsJSON);
    dispatch(loadSpots(spotsJSON));
  }
};

// Thunk get just one spot
export const oneSpotThunk = id => async dispatch => {
  const response = await fetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOneSpot(spot));
    return spot;
  }
};

// Thunk create a spot
export const createASpot = (data, imgUrlArr) => async dispatch => {
  const response = await csrfFetch("/api/spots", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const newSpot = await response.json();

    newSpot.avgRating = 0;
    newSpot.spotImages = [];

    for (let i = 0; i < imgUrlArr.length; i++) {
      let image = imgUrlArr[i];

      const response = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image)
      });

      if (response.ok) {
        const newImg = response.json();
        newSpot.spotImages.push(newImg);
      }
    }
    dispatch(createSpot(newSpot));
    return newSpot;
  }
};



// Reducer for get all spots, single spot, create spot

let initialState = {
  allSpots: {},
  singleSpot: {}
};

export default function spotsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_SPOTS:
      newState = {...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot }};
      action.spots.Spots.forEach(spot => { newState.allSpots[spot.id] = spot;});
      return newState;
    case LOAD_ONE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {  }
      };
      newState.singleSpot = action.spot;
      return newState;
    case ADD_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot }};
      newState.allSpots[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
}
