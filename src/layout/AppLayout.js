import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';
import Footer from '../containers/navs/Footer';
import { getCurrentUser } from '../helpers/Utils';

const AppLayout = ({ containerClassnames, children, history }) => {
  const currentUser = getCurrentUser();
  const token = currentUser ? `JWT ${currentUser?.token}` : undefined;
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} currentUser={currentUser} token={token} />
      <Sidebar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
