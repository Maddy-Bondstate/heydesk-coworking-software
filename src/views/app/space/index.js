import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SpaceLocations = React.lazy(() =>
  import(/* webpackChunkName: "space-locations" */ './locations')
);

const SpaceMeetingRoom = React.lazy(() =>
  import(/* webpackChunkName: "space-meeting-room" */ './meeting-room')
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
        path={`${match.url}/desks`}
        render={(props) => (
          <SpaceMeetingRoom
            {...props}
            type={1}
            heading="menu.desks"
            modelTitle="space.add-desk"
          />
        )}
      />
      <Route
        path={`${match.url}/meeting-room`}
        render={(props) => (
          <SpaceMeetingRoom
            {...props}
            type={5}
            heading="menu.meeting-rooms"
            modelTitle="space.add-meeting-room"
          />
        )}
      />
      <Route
        path={`${match.url}/private-cabins`}
        render={(props) => (
          <SpaceMeetingRoom
            {...props}
            type={4}
            heading="menu.private-cabins"
            modelTitle="space.add-private-cabin"
          />
        )}
      />
      <Route
        path={`${match.url}/conference-room`}
        render={(props) => (
          <SpaceMeetingRoom
            {...props}
            type={6}
            heading="menu.conference-room"
            modelTitle="space.add-conference-room"
          />
        )}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Space;
