import React from 'react';
import {
  Card,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const CustomerListView = ({
  item,
  collect,
  toggleModal,
  setModalId,
  setModalDeleteId,
}) => {
  return (
    <Colxx xxs="4" key={item.id} className="mb-4">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="flex-grow-1 min-width-zero">
            <div className="card-body">
              <div className="d-flex">
                <div>
                  <div className="d-flex align-items-center">
                    <NavLink to={`/`}>
                      <p className="list-item-heading mb-0">
                        <b>
                          {item.first_name} {item.last_name}
                        </b>
                      </p>
                    </NavLink>
                    <div className="d-flex align-items-center">
                      <UncontrolledDropdown className="ml-3">
                        <DropdownToggle color="none">
                          <i className="fa fa-cog fa-2x text-muted" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => {
                              return toggleModal(), setModalId(item);
                            }}
                            className="pd"
                          >
                            <i className="fa fa-pencil mr-2" />
                            <IntlMessages id="label.edit" />
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            onClick={() => setModalDeleteId(item.id)}
                            className="pd"
                          >
                            <i className="fa fa-trash mr-2" />
                            <IntlMessages id="label.delete" />
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                  <p
                    className="list-item-heading mb-0 text-sm"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {item.email}
                  </p>
                  <p
                    className="list-item-heading mb-0 text-sm"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {item.phone}
                  </p>
                  <p
                    className="list-item-heading mb-0 text-sm"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {item.address}, {item.city}, {item.state}
                  </p>
                  <p className="list-item-heading mb-0 text-sm">
                    {item.country} - {item.zipcode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CustomerListView);
