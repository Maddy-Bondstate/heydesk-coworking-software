import React from 'react';
import {
  Card,
  Badge,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Noimage } from '../../../constants/defaultValues';

const BookingListView = ({
  item,
  collect,
  toggleModal,
  setModalId,
  setModalDeleteId,
}) => {
  return (
    <Colxx xxs="12" key={item.id} className="mb-4">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="pl-2 flex-grow-1 min-width-zero">
            <div className="card-body">
              <div className="d-flex mb-4">
                <NavLink to={`/`} className="d-flex">
                  <img
                    alt={item.name}
                    src={item.image ? item.image : Noimage}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink>
                <div className="ml-4 d-flex justify-content-center flex-column">
                  <NavLink to={`/`}>
                    <p className="list-item-heading truncate mb-3">
                      {item.name}
                    </p>
                  </NavLink>
                  <div className="d-flex align-items-center">
                    {item.is_open && (
                      <Badge color="success badge-pill">Open</Badge>
                    )}
                    {item.is_public && (
                      <Badge color="primary badge-pill ml-2">Public</Badge>
                    )}
                    <UncontrolledDropdown className="ml-3">
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
                        <DropdownItem divider />
                        <DropdownItem onClick={() => setModalDeleteId(item.id)}>
                          <i className="fa fa-trash text-muted mr-2" />
                          <IntlMessages id="label.delete" />
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
export default React.memo(BookingListView);
