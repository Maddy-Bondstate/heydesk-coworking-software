import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';

const ClientCompanies = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">Companies</Colxx>
      </Row>
    </>
  );
};
export default injectIntl(ClientCompanies);
