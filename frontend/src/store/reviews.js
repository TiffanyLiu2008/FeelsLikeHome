import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_SPOTREVIEWS = 'reviews/LOAD_SPOTREVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

/**  Action Creators: */
export const loadSpotReviews = (spotId, reviews) => ({
  type: LOAD_SPOTREVIEWS,
  spotId,
  reviews,
});
export const receiveReview = (spotId, reviewData) => ({
  type: RECEIVE_REVIEW,
  spotId,
  reviewData,
});
export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

/** Thunk Action Creators: */
export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpotReviews(spotId, data));
    return data;
  }
  return res;
};
export const createReview = (spotId, reviewData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reviewData)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(spotId, data));
    return data;
  }
  return res;
};
export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeReview(reviewId));
    return data;
  }
  return res;
};

/** Reviews reducer: */
const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTREVIEWS:
      const reviewsState = {};
      action.reviews.Reviews.forEach((review) => {
        reviewsState[review.id] = review;
      });
      return {...state, [action.spotId]: reviewsState};
    case RECEIVE_REVIEW:
      return {...state, [action.spotId]: [...state[action.spotId], action.reviewData]};
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
