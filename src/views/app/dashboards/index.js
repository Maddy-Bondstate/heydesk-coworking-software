import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../../helpers/authHelper';

const DashboardOverview = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './overview')
);

const DashboardCalendar = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './calendar')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/calendar`} />

      <ProtectedRoute
        path={`${match.url}/overview`}
        component={DashboardOverview}
      />

      <ProtectedRoute
        path={`${match.url}/calendar`}
        component={DashboardCalendar}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
