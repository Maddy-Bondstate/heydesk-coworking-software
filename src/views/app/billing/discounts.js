import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const BillingDiscounts = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Discounts</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(BillingDiscounts);
