import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../../helpers/authHelper';

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
      <ProtectedRoute
        path={`${match.url}/locations`}
        component={SpaceLocations}
      />

      <ProtectedRoute
        path={`${match.url}/desks/:id`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 1,
          name: 'desks',
          heading: 'menu.desks',
          modelTitle: 'space.add-desk',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/desks`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 1,
          name: 'desks',
          heading: 'menu.desks',
          modelTitle: 'space.add-desk',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/meeting-room/:id`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 5,
          name: 'meeting-room',
          heading: 'menu.meeting-rooms',
          modelTitle: 'space.add-meeting-room',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/meeting-room`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 5,
          name: 'meeting-room',
          heading: 'menu.meeting-rooms',
          modelTitle: 'space.add-meeting-room',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/private-cabins/:id`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 4,
          name: 'private-cabins',
          heading: 'menu.private-cabins',
          modelTitle: 'space.add-private-cabin',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/private-cabins`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 4,
          name: 'private-cabins',
          heading: 'menu.private-cabins',
          modelTitle: 'space.add-private-cabin',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/conference-room/:id`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 6,
          name: 'conference-room',
          heading: 'menu.conference-room',
          modelTitle: 'space.add-conference-room',
        }}
      />

      <ProtectedRoute
        path={`${match.url}/conference-room`}
        component={SpaceMeetingRoom}
        initialLoad={{
          type: 6,
          name: 'conference-room',
          heading: 'menu.conference-room',
          modelTitle: 'space.add-conference-room',
        }}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Space;
