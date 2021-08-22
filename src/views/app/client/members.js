import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const ClientMembers = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Members</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(ClientMembers);
