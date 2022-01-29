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
        (obj) => obj.id === meeting_room.location.value
      );

      const objIndexFloor = locationData[objIndex]?.floors.findIndex(
        (obj) => obj.id === meeting_room.floor.value
      );

      if (locationData[objIndex]?.name)
        setLocationName(locationData[objIndex].name);

      if (locationData[objIndex]?.floors[objIndexFloor]?.name)
        setFloorName(
          `${locationData[objIndex].floors[objIndexFloor].name} - ${locationData[objIndex].floors[objIndexFloor].floor}`
        );
    }
  }, [locationData, meeting_room]);

  return (
    <Colxx xxs="12" key={meeting_room.id} className="mb-2">
      <ContextMenuTrigger id="menu_id" data={meeting_room.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="card-body">
            <Row>
              <Colxx sm="12" className="d-flex">
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
                      <p className="font-weight-bold mb-0 ml-2">
                        {meeting_room.name}
                      </p>
                    </NavLink>

                    <Label className="ml-4 mb-0">
                      <i className="fa fa-users text-muted" />
                      &nbsp; {meeting_room.size}
                    </Label>

                    <UncontrolledDropdown className="ml-4">
                      <DropdownToggle color="none">
                        <i
                          className="fa fa-cog fa-2x text-success"
                          title="settings"
                        />
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            return toggleModal(), setDataEdit(meeting_room);
                          }}
                          className="pd"
                        >
                          <i className="fa fa-pencil mr-2" />
                          <IntlMessages id="label.edit" />
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => setModalDeleteId(meeting_room.id)}
                          className="pd"
                        >
                          <i className="fa fa-trash mr-2" />
                          <IntlMessages id="label.delete" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      <b className="text-theme-6">Location:</b> {locationName}
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      <b className="text-theme-6">Floor:</b> {floorName}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      <b className="text-theme-6">Rate:</b> ${' '}
                      {meeting_room.rate}
                    </p>
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
