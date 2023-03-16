import { csrfFetch } from "./csrf";


// Variables
const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOTS = "spots/addSpots";
const EDIT_SPOTS = "spots/editSpots";
const DELETE_SPOTS = "spts/deleteSpots";
const LOAD_ONE_SPOT = "spots/oneSpot"
const ADD_SPOT_IMAGES = "spots/ADD_SPOT_IMAGE";

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
const initialState = { allSpots: {}, singleSpot: {} };

export const spotsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD_ONE_SPOT:
      return {
        ...state,
        singleSpot: { ...action.payload },
      };
    case LOAD_SPOTS:
      const allSpots = {};
      action.payload.Spots.forEach((spot) => (allSpots[spot.id] = spot));
      return {
        ...state,
        allSpots,
      };
    case ADD_SPOTS:
      newState = { ...state };
      let copy = { ...newState.allSpots };
      copy[action.payload.id] = action.payload;
      newState.allSpots = copy;
      return newState;
      case REMOVE_SPOT:
      const clearSpot = {}
      return {
        ...state,
        singleSpot: clearSpot
      }
    default:
      return state;
  }
};


// Reducer for create spot
