import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const BillingAmenities = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Amenities</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(BillingAmenities);
