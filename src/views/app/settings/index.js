import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../../helpers/authHelper';

const SettingsProfile = React.lazy(() =>
  import(/* webpackChunkName: "settings-profile" */ './profile')
);

const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
      <ProtectedRoute
        path={`${match.url}/profile`}
        component={SettingsProfile}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
