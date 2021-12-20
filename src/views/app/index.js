import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Space = React.lazy(() =>
  import(/* webpackChunkName: "space" */ './space')
);
const Client = React.lazy(() =>
  import(/* webpackChunkName: "client" */ './client')
);
const Billing = React.lazy(() =>
  import(/* webpackChunkName: "billing" */ './billing')
);
const Collaboration = React.lazy(() =>
  import(/* webpackChunkName: "collaboration" */ './collaboration')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/space`}
              render={(props) => <Space {...props} />}
            />
            <Route
              path={`${match.url}/client`}
              render={(props) => <Client {...props} />}
            />
            <Route
              path={`${match.url}/billing`}
              render={(props) => <Billing {...props} />}
            />
            <Route
              path={`${match.url}/collaboration`}
              render={(props) => <Collaboration {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
