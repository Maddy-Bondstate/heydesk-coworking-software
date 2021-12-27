import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../../helpers/authHelper';

const ClientBookings = React.lazy(() =>
  import(/* webpackChunkName: "client-client" */ './bookings')
);
const ClientCompanies = React.lazy(() =>
  import(/* webpackChunkName: "client-companies" */ './companies')
);
const ClientCustomers = React.lazy(() =>
  import(/* webpackChunkName: "client-customers" */ './customers')
);
const Client = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/bookings`} />

      <ProtectedRoute
        path={`${match.url}/bookings/:ids`}
        component={ClientBookings}
      />
      <ProtectedRoute
        path={`${match.url}/bookings`}
        component={ClientBookings}
      />
      <ProtectedRoute
        path={`${match.url}/companies`}
        component={ClientCompanies}
      />
      <ProtectedRoute
        path={`${match.url}/customers`}
        component={ClientCustomers}
      />

      {/* <Route
        path={`${match.url}/bookings/:id`}
        render={(props) => <ClientBookings {...props} />}
      /> */}
      {/* <Route
        path={`${match.url}/bookings`}
        render={(props) => <ClientBookings {...props} />}
      />
      <Route
        path={`${match.url}/companies`}
        render={(props) => <ClientCompanies {...props} />}
      />
      <Route
        path={`${match.url}/customers`}
        render={(props) => <ClientCustomers {...props} />}
      /> */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Client;
