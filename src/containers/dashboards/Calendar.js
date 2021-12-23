import React, { useState, useLayoutEffect } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import CalendarToolbar from '../../components/CalendarToolbar';
import IntlMessages from '../../helpers/IntlMessages';

import { getDirection } from '../../helpers/Utils';
import { Link } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const CalendarCard = ({ calendar, handleNavigate }) => {
  const [calendarList, setCalendarList] = useState([]);
  useLayoutEffect(() => {
    if (calendar?.data) setCalendarList(calendar.data);
  }, [calendar]);

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.calendar" />
          <Link to="/app/client/bookings/add">
            <Button
              color="primary"
              className="ml-4 text-small"
              style={{ padding: '8px 15px' }}
            >
              <IntlMessages id="pages.add-booking" />
            </Button>
          </Link>
        </CardTitle>
        <Calendar
          localizer={localizer}
          style={{ minHeight: '500px' }}
          events={calendarList ? calendarList : []}
          rtl={getDirection().isRtl}
          views={['month']}
          components={{
            toolbar: CalendarToolbar,
          }}
          onNavigate={(action) => handleNavigate(action)}
        />
      </CardBody>
    </Card>
  );
};

export default CalendarCard;
