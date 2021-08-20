import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CalendarCard from '../../../containers/dashboards/Calendar';

const DashboardCalendar = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.calendar" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx lg="12" xl="12" className="mb-4">
          <CalendarCard />
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DashboardCalendar);
