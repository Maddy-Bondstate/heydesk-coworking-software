import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SettingsProfile = React.lazy(() =>
  import(/* webpackChunkName: "settings-profile" */ './profile')
);

const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
      <Route
        path={`${match.url}/profile`}
        render={(props) => <SettingsProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
