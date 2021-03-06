import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SpaceLocations = React.lazy(() =>
  import(/* webpackChunkName: "space-locations" */ './locations')
);
const SpaceDesks = React.lazy(() =>
  import(/* webpackChunkName: "space-desks" */ './desks')
);
const SpaceMeetingRoom = React.lazy(() =>
  import(/* webpackChunkName: "space-meeting-room" */ './meeting-room')
);
const SpacePrivateCabins = React.lazy(() =>
  import(/* webpackChunkName: "space-private-cabins" */ './private-cabins')
);
const SpaceConferenceRoom = React.lazy(() =>
  import(/* webpackChunkName: "space-conference-room" */ './conference-room')
);

const Space = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/locations`} />
      <Route
        path={`${match.url}/locations`}
        render={(props) => <SpaceLocations {...props} />}
      />
      <Route
        path={`${match.url}/locations/:id`}
        render={(props) => <SpaceLocations {...props} />}
      />
      <Route
        path={`${match.url}/desks`}
        render={(props) => <SpaceDesks {...props} />}
      />
      <Route
        path={`${match.url}/meeting-room`}
        render={(props) => <SpaceMeetingRoom {...props} />}
      />
      <Route
        path={`${match.url}/private-cabins`}
        render={(props) => <SpacePrivateCabins {...props} />}
      />
      <Route
        path={`${match.url}/conference-room`}
        render={(props) => <SpaceConferenceRoom {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Space;
