import Spots from "../components/Spots";
import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOTS = "spots/addSpots";
const EDIT_SPOTS = "spots/editSpots";
const DELETE_SPOTS = "spts/deleteSpots";

export const loadSpots = (Spots) => ({
  type: LOAD_SPOTS,
  Spots
})

export const createSpots = (Spots) => ({
  type: ADD_SPOTS,
  Spots
})
