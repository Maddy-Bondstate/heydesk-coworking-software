import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const BillingPlans = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Plans</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(BillingPlans);
