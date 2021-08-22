import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const SpacePrivateCabins = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Private Cabins</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(SpacePrivateCabins);
