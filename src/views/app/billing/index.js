import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const BillingInvoices = React.lazy(() =>
  import(/* webpackChunkName: "billing-invoices" */ './invoices')
);
const BillingPlans = React.lazy(() =>
  import(/* webpackChunkName: "billing-plans" */ './plans')
);
const BillingAmenities = React.lazy(() =>
  import(/* webpackChunkName: "billing-amenities" */ './amenities')
);
const BillingDiscounts = React.lazy(() =>
  import(/* webpackChunkName: "billing-discounts" */ './discounts')
);
const Billing = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/invoices`} />
      <Route
        path={`${match.url}/invoices`}
        render={(props) => <BillingInvoices {...props} />}
      />
      <Route
        path={`${match.url}/plans`}
        render={(props) => <BillingPlans {...props} />}
      />
      <Route
        path={`${match.url}/amenities`}
        render={(props) => <BillingAmenities {...props} />}
      />
      <Route
        path={`${match.url}/discounts`}
        render={(props) => <BillingDiscounts {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Billing;
