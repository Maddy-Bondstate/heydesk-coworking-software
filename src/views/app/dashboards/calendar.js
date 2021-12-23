import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CalendarCard from '../../../containers/dashboards/Calendar';
import { getDashboardCalendarList } from '../../../redux/actions';
import { connect } from 'react-redux';
import moment from 'moment';

const DashboardCalendar = ({
  match,
  token,
  getDashboardCalendarListAction,
  calendar,
}) => {
  const dataAction = (action = null) => {
    action = action ? moment(action) : moment();
    return {
      month: action.format('MM'),
      year: action.format('YYYY'),
    };
  };
  useEffect(() => {
    const data = dataAction();
    getDashboardCalendarListAction(data, token);
  }, [getDashboardCalendarListAction, token]);

  const handleNavigate = (action) => {
    const data = dataAction(action);
    getDashboardCalendarListAction(data, token);
  };

  return (
    <Row>
      <Colxx sm="12">
        <Breadcrumb heading="menu.calendar" match={match} />
        <Separator className="mb-5" />
      </Colxx>

      <Colxx sm="12" className="mb-4">
        <CalendarCard calendar={calendar} handleNavigate={handleNavigate} />
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ dashboard }) => {
  const { calendar } = dashboard;
  return { calendar };
};

export default injectIntl(
  connect(mapStateToProps, {
    getDashboardCalendarListAction: getDashboardCalendarList,
  })(DashboardCalendar)
);
