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

const LocationListView = ({
  item,
  collect,
  toggleModal,
  toggleFloor,
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
                        <DropdownItem onClick={() => toggleFloor(item.id)}>
                          <i className="fa fa-plus text-muted mr-2" />
                          <IntlMessages id="label.add_floor" />
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

              {item.floor?.length > 0 ? (
                item.floor.map((floor, i) => (
                  <div className="d-flex ml-4 mt-3" key={i}>
                    <NavLink to={`/`} className="d-flex">
                      <img
                        alt={floor.name}
                        src={floor.image}
                        className="list-thumbnail-small responsive border-0 card-img-left"
                      />
                    </NavLink>
                    <div>
                      <div className="d-flex align-items-center ml-4 mb-1">
                        <NavLink to={`/`}>
                          <p className="list-item-heading text-sm truncate mb-0">
                            {floor.name}
                          </p>
                        </NavLink>
                        {floor.isOpen && (
                          <div className="ml-2">
                            <Badge color="success badge-small mb-0">Open</Badge>
                          </div>
                        )}
                        <UncontrolledDropdown className="ml-3">
                          <DropdownToggle color="none">
                            <i className="fa fa-cog fa-lg text-muted" />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => toggleFloor()}>
                              <i className="fa fa-pencil text-muted mr-2" />
                              <IntlMessages id="label.edit" />
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                              <i className="fa fa-trash text-muted mr-2" />
                              <IntlMessages id="label.delete" />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="d-flex align-items-center ml-4">
                        <p className="text-muted text-small mb-0">
                          Floor {floor.floor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted">No floors to show</div>
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(LocationListView);
