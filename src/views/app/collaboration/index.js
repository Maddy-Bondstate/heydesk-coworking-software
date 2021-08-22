import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CollaborationTickets = React.lazy(() =>
  import(/* webpackChunkName: "collaboration-tickets" */ './tickets')
);
const Collaboration = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/tickets`} />
      <Route
        path={`${match.url}/tickets`}
        render={(props) => <CollaborationTickets {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Collaboration;
