import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import SpotIndex from './components/SpotIndex/index';
import SpotDetails from './components/SpotDetails/index';
import CreateSpot from './components/CreateSpot/index';
import UpdateSpot from './components/UpdateSpot/index';
import ManageSpots from './components/ManageSpots/index';
import ManageReviews from './components/ManageReviews/index';
// import DeleteSpotModal from './components/DeleteSpotModal/index';
// import DeleteReviewModal from './components/DeleteReviewModal/index';
// import PostReviewModal from './components/PostReviewModal/index';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded &&
      <Switch>
        <Route exact path="/reviews/current" component={ManageReviews}/>
        <Route exact path="/spots/current" component={ManageSpots}/>
        <Route exact path="/spots/new" component={CreateSpot}/>
        <Route exact path="/spots/:spotId/edit" component={UpdateSpot}/>
        <Route exact path="/spots/:spotId(\d+)" component={SpotDetails}/>
        <Route exact path="/" component={SpotIndex}/>
        {/* <Route exact path="/spots/:spotId/delete" component={DeleteSpotModal}/>
        <Route exact path="/reviews/:reviewId/delete" component={DeleteReviewModal}/>
        <Route exact path="/spots/:spotId/reviews/new" component={PostReviewModal}/> */}
      </Switch>}
    </>
  );
}

export default App;
