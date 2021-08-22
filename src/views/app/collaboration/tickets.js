import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const CollaborationTickets = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Tickets</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(CollaborationTickets);
