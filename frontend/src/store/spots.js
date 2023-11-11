import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

/**  Action Creators: */
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});
export const receiveSpot = (spot) => ({
  type: RECEIVE_SPOT,
  spot,
});
export const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});
export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

/** Thunk Action Creators: */
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data));
    return data;
  }
  return res;
};
export const getMySpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data));
    return data;
  }
  return res;
};
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`api/spots/${spotId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeSpot(spotId));
    return data;
  }
  return res;
};
export const getSpotDetails = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveSpot(data));
    return data;
  }
  return res;
};
export const createSpot = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveSpot(data));
    console.log(data);
    return data;
  }
  return res;
};
export const updateSpot = (payload) => async (dispatch) => {
  const res = await csrfFetch(`api/spots/${payload.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editSpot(data));
    return data;
  }
  return res;
};

/** Spots reducer: */
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {...state};
      action.spots.Spots.forEach((spot) => {
         if (!spotsState[spot.id]) {
          spotsState[spot.id] = spot;
        }
      });
      return {...spotsState};
    case RECEIVE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case REMOVE_SPOT:
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
