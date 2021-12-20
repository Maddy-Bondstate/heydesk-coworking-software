import React from 'react';
import {
  Row,
  Card,
  Label,
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

const MeetingRoomListView = ({
  meeting_room,
  collect,
  toggleModal,
  toggleFloor,
}) => {
  return (
    <Colxx xxs="12" key={meeting_room.id} className="mb-2">
      <ContextMenuTrigger id="menu_id" data={meeting_room.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="card-body">
            <Row>
              <Colxx sm="6" className="d-flex">
                <NavLink to={`/`} className="d-flex">
                  <img
                    alt={meeting_room.general.name}
                    src={meeting_room.calendar.image}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink>
                <div className="ml-4 d-flex justify-content-center flex-column">
                  <div className="d-flex align-items-center">
                    <Badge
                      color="success badge-pill"
                      style={{
                        background: `${meeting_room.calendar.color}`,
                        padding: '2px 6px',
                      }}
                    >
                      &nbsp;
                    </Badge>
                    <NavLink to={`/`}>
                      <p className="font-weight-bold truncate mb-0 ml-2">
                        {meeting_room.general.name}
                      </p>
                    </NavLink>
                    <UncontrolledDropdown className="ml-2">
                      <DropdownToggle color="none">
                        <i className="fa fa-cog fa-lg text-muted" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => toggleModal()}>
                          <i className="fa fa-pencil text-muted mr-2" />
                          <IntlMessages id="label.edit" />
                        </DropdownItem>
                        <DropdownItem onClick={() => toggleFloor()}>
                          <i className="fa fa-plus text-muted mr-2" />
                          <IntlMessages id="label.add_floor" />
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <i className="fa fa-trash text-muted mr-2" />
                          <IntlMessages id="label.delete" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <Label className="ml-2 mb-0">
                      <i className="fa fa-users fa-lg1 text-muted" /> 8
                    </Label>
                  </div>

                  <div className="d-flex align-items-center"></div>
                </div>
              </Colxx>
              <Colxx sm="6" className="d-flex">
                <NavLink to={`/`} className="d-flex">
                  <img
                    alt={meeting_room.general.name}
                    src={meeting_room.general.image}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink>
                <div className="ml-4 d-flex justify-content-center flex-column">
                  <NavLink to={`/`}>
                    <p className="list-item-heading truncate mb-3">
                      {meeting_room.general.name}
                    </p>
                  </NavLink>
                  <div className="d-flex align-items-center">
                    {meeting_room.general.isOpen && (
                      <Badge color="success badge-pill">Open</Badge>
                    )}
                    {meeting_room.isPublic && (
                      <Badge color="primary badge-pill ml-2">Public</Badge>
                    )}
                    <UncontrolledDropdown className="ml-3">
                      <DropdownToggle color="none">
                        <i className="fa fa-cog fa-2x text-muted" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => toggleModal()}>
                          <i className="fa fa-pencil text-muted mr-2" />
                          <IntlMessages id="label.edit" />
                        </DropdownItem>
                        <DropdownItem onClick={() => toggleFloor()}>
                          <i className="fa fa-plus text-muted mr-2" />
                          <IntlMessages id="label.add_floor" />
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <i className="fa fa-trash text-muted mr-2" />
                          <IntlMessages id="label.delete" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </Colxx>
            </Row>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(MeetingRoomListView);
