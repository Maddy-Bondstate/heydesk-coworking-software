import React, { useState, useLayoutEffect } from 'react';
import { Row, Card, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { Noimage } from '../../../constants/defaultValues';
import moment from 'moment';
// import IntlMessages from '../../../helpers/IntlMessages';
// import { Noimage } from '../../../constants/defaultValues';

const BookingListView = ({
  item,
  collect,
  // toggleModal,
  // setModalId,
  // setModalDeleteId,
  customerData,
  spaceData,
}) => {
  const [customer, setCustomer] = useState([]);
  const [space, setSpace] = useState([]);

  const type = [
    'Hotdesks',
    'Dedicated desks',
    'Private offices',
    'Private Cabins',
    'Meeting rooms',
    'Conference rooms',
  ];

  useLayoutEffect(() => {
    if (customerData !== null) {
      const objIndex = customerData.findIndex(
        (obj) => obj.id === item.customer.value
      );

      if (customerData[objIndex]) setCustomer(customerData[objIndex]);
    }

    if (spaceData !== null) {
      const objIndex = spaceData.findIndex(
        (obj) => obj.id === item.space.value
      );

      if (spaceData[objIndex]) setSpace(spaceData[objIndex]);
    }
  }, [customerData, spaceData, item]);

  return (
    <Colxx xxs="12" key={item.id} className="mb-2">
      <ContextMenuTrigger id="menu_id" data={item.id} collect={collect}>
        <Card className="d-flex flex-row">
          <div className="card-body">
            <Row>
              <Colxx sm="6" className="d-flex">
                <NavLink to={`/`} className="d-flex">
                  <img
                    alt={space.name}
                    src={space.image ? space.image : Noimage}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink>
                <div className="ml-4 d-flex justify-content-center flex-column">
                  <div className="d-flex align-items-center">
                    <Badge
                      color="success badge-pill"
                      style={{
                        background: `${item.color}`,
                        padding: '2px 6px',
                      }}
                    >
                      &nbsp;
                    </Badge>
                    <NavLink to={`/`}>
                      <p className="font-weight-bold truncate mb-0 ml-2">
                        {space.name}
                      </p>
                    </NavLink>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="font-weight-bold truncate mb-0 ml-4 mt-1">
                      Type: {type[space.type - 1]}
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">Booking Date</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1 text-small">
                      Start Date:{' '}
                      {moment(item.start_time, 'DD/MM/YYYY HH:mm').format(
                        'MMM DD, YYYY HH:mm'
                      )}
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1  text-small">
                      End Date:{' '}
                      {moment(item.end_time, 'DD/MM/YYYY HH:mm').format(
                        'MMM DD, YYYY HH:mm'
                      )}
                    </p>
                  </div>

                  {/* <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      Location: {locationName}
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      Floor: {floorName}
                    </p>
                  </div> */}
                  {/* <div className="d-flex align-items-center">
                    <p className="truncate mb-0 ml-4 mt-1">
                      Rate: $ {item.rate}
                    </p>
                  </div> */}
                </div>
              </Colxx>
              <Colxx sm="6" className="d-flex">
                <NavLink to={`/`} className="d-flex">
                  <img
                    alt={space.name}
                    src={space.image ? space.image : Noimage}
                    className="list-thumbnail responsive border-0 card-img-left"
                  />
                </NavLink>
                <div className="ml-4 d-flex justify-content-center flex-column">
                  <div className="d-flex align-items-center">
                    <NavLink to={`/`}>
                      <p className="font-weight-bold truncate mb-0 ml-2">
                        {customer.first_name} {customer.last_name}
                      </p>
                    </NavLink>
                  </div>

                  {/* <div className="d-flex align-items-center"> */}
                  <p className="truncate mb-0 ml-2 mt-1 text-small">
                    {customer.email}
                  </p>

                  <p className="truncate mb-0 ml-2 mt-1 text-small">
                    {customer.phone}
                  </p>

                  <p className="truncate mb-0 ml-2 mt-1 text-small">
                    {customer.address}, {customer.city}, {customer.state}
                  </p>
                  <p className="truncate mb-0 ml-2 mt-0 text-small">
                    {customer.country} - {customer.zipcode}
                  </p>
                  {/* </div> */}
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
export default React.memo(BookingListView);
