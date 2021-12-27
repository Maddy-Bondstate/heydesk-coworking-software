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

const CustomerListView = ({ item, collect, toggleModal, setModalId }) => {
  return (
    <Colxx xxs="6" key={item.id} className="mb-4">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="flex-grow-1 min-width-zero">
            <div className="card-body">
              <div className="d-flex">
                <div className="d-flex justify-content-center">
                  <div>
                    <NavLink to={`/`}>
                      <p className="list-item-heading truncate mb-0">
                        <b>
                          {item.first_name} {item.last_name}
                        </b>
                      </p>
                    </NavLink>
                    <p className="list-item-heading mb-0 text-sm">
                      {item.email}
                    </p>
                    <p className="list-item-heading mb-0 text-sm">
                      {item.phone}
                    </p>
                    <p className="list-item-heading mb-0 text-sm">
                      {item.address}, {item.city}, {item.state}
                    </p>
                    <p className="list-item-heading mb-0 text-sm">
                      {item.country} - {item.zipcode}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <UncontrolledDropdown className="ml-5">
                      <DropdownToggle color="none">
                        <i className="fa fa-cog fa-2x text-muted" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            return toggleModal(), setModalId(item);
                          }}
                        >
                          <i className="fa fa-pencil text-muted mr-2" />
                          <IntlMessages id="label.edit" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
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
