import React, { useState, useLayoutEffect } from 'react';
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
import { Noimage } from '../../../constants/defaultValues';

const MeetingRoomListView = ({
  meeting_room,
  collect,
  toggleModal,
  // toggleFloor,
  locationData,
  setDataEdit,
  setModalDeleteId,
}) => {
  const [locationName, setLocationName] = useState('');
  const [floorName, setFloorName] = useState('');

  useLayoutEffect(() => {
    if (locationData) {
      const objIndex = locationData.findIndex(
        (obj) => obj.id == meeting_room.location.value
      );

      const objIndexFloor = locationData[objIndex]?.floors.findIndex(
        (obj) => obj.id == meeting_room.floor.value
      );

      console.log(objIndex, objIndexFloor);

      // console.log(locationData[objIndex].floors[objIndexFloor]);

      if (locationData[objIndex]?.name)
        setLocationName(locationData[objIndex].name);

      if (locationData[objIndex]?.floors[objIndexFloor]?.name)
        setFloorName(
          `${locationData[objIndex].floors[objIndexFloor].name} - ${locationData[objIndex].floors[objIndexFloor].floor}`
        );
    }
  }, [locationData]);

  return (
    <Colxx xxs="12" key={meeting_room.id} className="mb-2">
      <ContextMenuTrigger id="menu_id" data={meeting_room.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="card-body">
            <Row>
              <Colxx sm="6" className="d-flex">
                <NavLink to={`/`} className="d-flex">
                  <img
                    alt={meeting_room.name}
                    src={meeting_room.image ? meeting_room.image : Noimage}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink>
                <div className="ml-4 d-flex justify-content-center flex-column">
                  <div className="d-flex align-items-center">
                    <Badge
                      color="success badge-pill"
                      style={{
                        background: `${meeting_room.color}`,
                        padding: '2px 6px',
                      }}
                    >
                      &nbsp;
                    </Badge>
                    <NavLink to={`/`}>
                      <p className="font-weight-bold truncate mb-0 ml-2">
                        {meeting_room.name}
                      </p>
                    </NavLink>
                    <UncontrolledDropdown className="ml-2">
                      <DropdownToggle color="none">
                        <i className="fa fa-cog fa-lg text-muted" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            return toggleModal(), setDataEdit(meeting_room);
                          }}
                        >
                          <i className="fa fa-pencil text-muted mr-2" />
                          <IntlMessages id="label.edit" />
                        </DropdownItem>
                        {/* <DropdownItem onClick={() => toggleFloor()}>
                          <i className="fa fa-plus text-muted mr-2" />
                          <IntlMessages id="label.add_floor" />
                        </DropdownItem> */}
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => setModalDeleteId(meeting_room.id)}
                        >
                          <i className="fa fa-trash text-muted mr-2" />
                          <IntlMessages id="label.delete" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <Label className="ml-2 mb-0">
                      <i className="fa fa-users fa-lg1 text-muted" />{' '}
                      {meeting_room.size}
                    </Label>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      Location: {locationName}
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      Floor: {floorName}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      Rate: $ {meeting_room.rate}
                    </p>
                  </div>
                </div>
              </Colxx>
              <Colxx sm="6" className="d-flex">
                {/* <NavLink to={`/`} className="d-flex">
                  <img
                    alt={meeting_room.name}
                    src={meeting_room.image}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink> */}
                <div className="d-flex justify-content-center flex-column">
                  <NavLink to={`/`}>
                    <p className="list-item-heading truncate mb-3">
                      {meeting_room.name}
                    </p>
                  </NavLink>
                  <div className="d-flex align-items-center">
                    {meeting_room.privacy === 1 ? (
                      <Badge color="success badge-pill">
                        Full Access / Public
                      </Badge>
                    ) : (
                      <Badge color="primary badge-pill">
                        Active Member / Private
                      </Badge>
                    )}
                    <UncontrolledDropdown className="ml-3">
                      <DropdownToggle color="none">
                        <i className="fa fa-cog fa-2x text-muted" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            return toggleModal(), setDataEdit(meeting_room);
                          }}
                        >
                          <i className="fa fa-pencil text-muted mr-2" />
                          <IntlMessages id="label.edit" />
                        </DropdownItem>
                        {/* <DropdownItem onClick={() => toggleFloor()}>
                          <i className="fa fa-plus text-muted mr-2" />
                          <IntlMessages id="label.add_floor" />
                        </DropdownItem> */}
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => setModalDeleteId(meeting_room.id)}
                        >
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
