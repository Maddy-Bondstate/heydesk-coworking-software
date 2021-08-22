import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const BillingInvoices = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Invoices</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(BillingInvoices);
