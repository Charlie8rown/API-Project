import { csrfFetch } from "./csrf";

const LOAD_ALL = "/spots/loadAll";
const LOAD_ONE_SPOT = "/spots/loadOneSpot";
const CREATE_SPOT = "/spots/createSpot";
const UPDATE_SPOT = "/spots/updateSpot";
const DELETE = "/spots/deleteSpot";
const USERS_SPOTS =  "/spots/allUserSpots";

// Action Creators
const loadAll = (spots) => ({
  type: LOAD_ALL,
  payload: spots
})

const loadOne = (spotId) => ({
  type: LOAD_ONE_SPOT,
   spotId
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot
})

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

const deleteSpot = (spotId) => ({
  type: DELETE,
  spotId
})

const allUserSpots = (spots) => ({
  type: USERS_SPOTS,
  payload: spots
})



// Thunk Actions
export const getSpots = (payload) => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if(res.ok) {
    const spots = await res.json();
    dispatch(loadAll(spots));
    return spots;
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`)
  if(response.ok){
    const spotData = await response.json()
    dispatch(loadOne(spotData))
  }
}


// export const createSpots = ({address, city, state, country, lat, lng, name, description, price, url, preview}) => async (dispatch) => {
//   const response = await csrfFetch('/api/spots/', {
//       method: 'POST',
//       body: JSON.stringify({
//         address, city, state, country, lat, lng, name, description, price
//       })
//   })

export const createSpots = ( createdSpot, createdImages) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createdSpot)
  });

  let spotData = await response.json();
  spotData['SpotImages'] = [];

  if (response.ok) {
    for (let i = 0; i < createdImages.length; i++) {
      let res = await csrfFetch(`/api/spots/${spotData.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdImages[i])
      });

      let Image = await res.json();

      if (res.ok) {
        spotData.SpotImages.push(Image)
      }
    }
    await dispatch(createSpot(spotData))

    return spotData;
  }
};

export const removeSpot = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  })

  if (response.ok) {
    const  deleted = await response.json();
    console.log("this should delete", deleted);
    dispatch(deleteSpot(id));
    // dispatch(currUserSpots);
    return deleted;
  }
};

export const currUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`)
  const spots = await response.json()

  dispatch(allUserSpots(spots))
  return spots;
};

export const updatingSpot = (spots) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spots.id}`, {
    method: "PUT",
    headers: { 'constent-Type': 'application/json' },
    body: JSON.stringify(spots)
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateSpot(data))
    return data
  }
}


// Spot Reducer
const initialState = {allSpots: {}, singleSpot: {}, allUserSpots: {}};

export default function spotReducer (state = initialState, action) {
  let newState

  switch (action.type) {
    case LOAD_ALL:
      newState = { ...state };
      const allSpots = {}
      action.payload.Spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      newState.allSpots = allSpots
      return newState;

    case LOAD_ONE_SPOT:
      newState = { ...state };
      newState.singleSpot = action.spotId;
      return newState;

    case CREATE_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case USERS_SPOTS: {
      const newState = { ...state };
      let currUserSpotCopies = {};
      action.payload.Spots.forEach(spot => {
        currUserSpotCopies[spot.id] = spot
      });
      newState.allUserSpots = currUserSpotCopies
      return newState
    }

    case UPDATE_SPOT:
      let  updateCurrSpot = {...state.singleSpot, ...action.payload}
      return {...state,singleSPot: updateCurrSpot}

    case DELETE: {
      const newState = { ...state, allUserSpots: {...state.allUserSpots} };

      delete newState.allUserSpots[action.spotId];

      return newState;
    }
    default:
      return state;
  }
};
