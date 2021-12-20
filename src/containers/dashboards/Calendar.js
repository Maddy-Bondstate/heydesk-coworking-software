import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import CalendarToolbar from '../../components/CalendarToolbar';
import IntlMessages from '../../helpers/IntlMessages';
import data from '../../data/events';

import { getDirection } from '../../helpers/Utils';

import { getDashboardCalendarList } from '../../redux/actions';
import { connect } from 'react-redux';

const localizer = momentLocalizer(moment);

const CalendarCard = ({
  loading,
  calendar,
  getDashboardCalendarListAction,
}) => {
  const [calendarList, setCalendarList] = useState([]);

  useEffect(() => {
    const data = {
      month: moment().format('MM'),
      year: moment().format('YYYY'),
    };
    getDashboardCalendarListAction(data);
  }, [getDashboardCalendarListAction]);

  useLayoutEffect(() => {
    if (calendar?.data) setCalendarList(calendar.data);
  });

  const handleNavigate = (action) => {
    const data = {
      month: moment(action).format('MM'),
      year: moment(action).format('YYYY'),
    };
    getDashboardCalendarListAction(data);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.calendar" />
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
          onNavigate={handleNavigate}
        />
      </CardBody>
    </Card>
  );
};

const mapStateToProps = ({ dashboard }) => {
  const { loading, calendar } = dashboard;
  return { loading, calendar };
};

export default connect(mapStateToProps, {
  getDashboardCalendarListAction: getDashboardCalendarList,
})(CalendarCard);
