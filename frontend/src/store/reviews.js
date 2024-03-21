import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_SPOTREVIEWS = 'reviews/LOAD_SPOTREVIEWS';
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

/**  Action Creators: */
export const loadSpotReviews = (spotId, reviews) => ({
  type: LOAD_SPOTREVIEWS,
  spotId,
  reviews,
});
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});
export const receiveReview = (spotId, review) => ({
  type: RECEIVE_REVIEW,
  spotId,
  review,
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
export const getMyReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews/current');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data));
    return data;
  }
  return res;
};
export const createReview = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(review)
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
      const spotReviewsState = {};
      action.reviews.Reviews.forEach((review) => {
        spotReviewsState[review.id] = review;
      });
      return {...state, [action.spotId]: spotReviewsState};
    case LOAD_REVIEWS:
        const reviewsState = {...state};
        action.reviews.Reviews.forEach((review) => {
          if (!reviewsState[review.id]) {
            reviewsState[review.id] = review;
          }
        });
        return {...reviewsState};
    case RECEIVE_REVIEW:
      return { ...state, [action.spotId]: action.review };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
