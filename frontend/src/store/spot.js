import { csrfFetch } from "./csrf";

const LOAD_ALL = "/spots/loadAll";
const LOAD_ONE = "/spots/loadOne";
const CREATE_SPOT = "/spots/createSpot";
// const UPDATE_SPOT = "/spots/updateSpot";
// const DELETE = "/spots/deleteSpot";

// Action Creators
const loadAll = (spots) => ({
  type: LOAD_ALL,
  spots
})

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

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

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));
    return response;
  }
};


export const createSpots = (newSpotInfo, previewImage) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(newSpotInfo)
  })

  if (response.ok) {
    const newSpot = await response.json();

    const res = await csrfFetch(`/api/apots/${newSpot.id}/image`, {
      body: JSON.stringify({ url: previewImage , previewImage: true})
    });

    if (res.ok) {
      const newSpotImage = await res.json();
      newSpot.previewImage = newSpotImage.url
      dispatch(createSpot(newSpot));
      return newSpot;
    }
  }
}

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
      newState.allSpots[spot.id] = spot
    });
    return newState

    case LOAD_ONE: {
      console.log("here");
      const newState = {...state}
      newState.singleSpot = action.spot
      return newState
    }
    case CREATE_SPOT: {
      newState.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
      return newState;
    }
    default:
      return state
  }
};
