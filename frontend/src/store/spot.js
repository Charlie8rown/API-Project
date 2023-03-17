import { csrfFetch } from "./csrf";

const LOAD_ALL = "/spots/loadAll";
const LOAD_ONE_SPOT = "/spots/loadOne";
const CREATE_SPOT = "/spots/createSpot";
// const UPDATE_SPOT = "/spots/updateSpot";
const DELETE = "/spots/deleteSpot";

// Action Creators
const loadAll = (spots) => ({
  type: LOAD_ALL,
  payload: spots
})

const loadOne = (spot) => ({
  type: LOAD_ONE_SPOT,
    payload: spot
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot
})

// const updateSpot = (spot) => ({
//   type: UPDATE_SPOT,
//   spot
// })

const deleteSpot = (spotId) => ({
  type: DELETE,
  spotId
})



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
  const response = await csrfFetch(`/api/spots/${spotId}`)
  const spotData = await response.json()
  dispatch(loadOne(spotData))
  return spotData
}


export const createSpots = ({address, city, state, country, lat, lng, name, description, price, url, preview}) => async (dispatch) => {
  const response = await csrfFetch('/api/spots/', {
      method: 'POST',
      body: JSON.stringify({
        address, city, state, country, lat, lng, name, description, price
      })
  })

  if (response.ok) {
      const spot = await response.json();
      console.log(spot);
      const imgResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        body: JSON.stringify({
            url, preview
        })
      })
      if (imgResponse.ok) dispatch(createSpot(spot));
  }
};

export const removeSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  })

  if (response.ok) {
    dispatch(deleteSpot(id));
  }
  return response.json;
};

// export const putSpot = (payload => async dispatch => {

//   return response
// })

// Spot Reducer
const initialState = {allSpots: {}, singleSpot: {}};

export default function spotReducer (state = initialState, action) {
  let newState = {...state}

  switch (action.type) {
    case LOAD_ALL:
      newState = { allSpots: {}, singleSpot: {} };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;

    case LOAD_ONE_SPOT:
      newState = { ...state };
      newState.singleSpot = action.payload;
      return newState;

    case CREATE_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE: {
      const newState = { ...state };
      const spotId = action.payload;
      console.log("payload", action.payload);

      delete newState[spotId];

      return newState;
    }
    default:
      return state;
  }
};
