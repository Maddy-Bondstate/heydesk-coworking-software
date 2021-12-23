import React, { useState, useLayoutEffect } from 'react';
import { Row, Card, Badge, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { Noimage } from '../../../constants/defaultValues';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../helpers/IntlMessages';

const ProfileListView = ({ item, collect, toggleModal }) => {
  return (
    <Colxx xxs="6" key={item.id} className="mb-2">
      <ContextMenuTrigger id="menu_id" data={item.pk} collect={collect}>
        <Card className="d-flex flex-row p-3">
          <div className="card-body">
            <p className="truncate mb-0 mt-1">
              <label className="font-weight-bold">Name: </label>{' '}
              {item.first_name} {item.last_name}
            </p>
            <p className="truncate mb-0 mt-1">
              <label className="font-weight-bold">Username: </label>{' '}
              {item.username}
            </p>
            <p className="truncate mb-0 mt-1">
              <label className="font-weight-bold">Email: </label> {item.email}
            </p>

            <Button
              color="primary"
              className="top-right-button mt-3"
              onClick={() => toggleModal()}
            >
              <IntlMessages id="pages.edit-profile" />
            </Button>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(injectIntl(ProfileListView));
