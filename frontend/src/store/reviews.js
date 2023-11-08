/** Action Type Constants: */
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

/**  Action Creators: */
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review,
});

export const editReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

/** Thunk Action Creators: */
export const getAllReviews = () => async (dispatch) => {
  const res = await fetch('/api/reviews');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data));
    return data;
  }
  return res;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeReview(reviewId));
    return data;
  }
  return res;
};

export const getReviewDetails = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data));
    return data;
  }
  return res;
};

export const createReview = (payload) => async (dispatch) => {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data));
    return data;
  }
  return res;
};

export const updateReview = (payload) => async (dispatch) => {
  const res = await fetch(`api/reviews/${payload.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editReview(data));
    return data;
  }
  return res;
};

/** Reviews reducer: */
const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsState = {};
      action.reviews.Reviews.forEach((review) => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    case RECEIVE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case UPDATE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
