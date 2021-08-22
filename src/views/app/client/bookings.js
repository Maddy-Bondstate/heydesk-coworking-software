import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const ClientBookings = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Bookings</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(ClientBookings);
