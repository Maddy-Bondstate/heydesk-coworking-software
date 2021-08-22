import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const SpaceConferenceRoom = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Conference Room</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(SpaceConferenceRoom);
