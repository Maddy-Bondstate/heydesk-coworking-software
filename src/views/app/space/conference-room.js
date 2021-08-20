import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';

const SpaceConferenceRoom = ({ intl, match }) => {
  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.overview" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx lg="12" xl="6" className="mb-4">
          <IconCardsCarousel />
        </Colxx>

        <Colxx lg="3" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-male"
            title={`4 ${messages['dashboards.users']}`}
            detail={messages['dashboards.on-approval-process']}
            percent={(4 * 100) / 6}
            progressText="4/6"
          />
        </Colxx>
        <Colxx lg="3" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-bell"
            title={`3 ${messages['dashboards.alerts']}`}
            detail={messages['dashboards.waiting-for-notice']}
            percent={(3 * 100) / 3}
            progressText="3/3"
          />
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(SpaceConferenceRoom);
