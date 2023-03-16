import { csrfFetch } from "./csrf";

const LOAD_ALL = "";
const LOAD_ONE = "";
const CREATE_SPOT = "";
const CREATE_IMAGE = "";
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

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

const createImage = (image) => ({
  type: CREATE_IMAGE,
  image
})

const delete = (spotId) => ({
  type: DELETE;
  spotId
})



// Thunk Actions
export const getSpots = (payload) => async dispatch => {

  return response
}

export const getOneSpot = (id) => async dispatch => {

  return response
}

export const postSpot = (payload) => async dispatch => {

  return spot
}

export const deleteSpot = (id) => async dispatch => {

  return response
}

export const putSpot = (payload => async dispatch => {

  return response
})

// Spot Reducer
const initialState = {allSpotes: {}, singleSpot: {}};

const spotReducer = (state = initialState, action) => {
  let newState:
  switch (action.type) {
    case LOAD_ALL: {

      return newState
    }
    case LOAD_ONE: {

      return newState
    }
    case CREATE_SPOT: {

      return newState
    }
    case CREATE_IMAGE: {

      return newState
    }
    case DELETE: {

      return newState
    }
    default:
      return state
  }
};
