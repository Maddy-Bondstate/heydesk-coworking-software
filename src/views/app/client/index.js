import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClientBookings = React.lazy(() =>
  import(/* webpackChunkName: "client-client" */ './bookings')
);
const ClientCompanies = React.lazy(() =>
  import(/* webpackChunkName: "client-companies" */ './companies')
);
const ClientMembers = React.lazy(() =>
  import(/* webpackChunkName: "client-members" */ './members')
);
const Client = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/bookings`} />
      <Route
        path={`${match.url}/bookings`}
        render={(props) => <ClientBookings {...props} />}
      />
      <Route
        path={`${match.url}/companies`}
        render={(props) => <ClientCompanies {...props} />}
      />
      <Route
        path={`${match.url}/members`}
        render={(props) => <ClientMembers {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Client;
