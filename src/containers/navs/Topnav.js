/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getSettingsProfileList,
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from '../../redux/actions';

import {
  // localeOptions,
  adminRoot,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import IntlMessages from '../../helpers/IntlMessages';

// import { getCurrentUser } from '../../helpers/Utils';
// import TopnavNotifications from './Topnav.Notifications';

// import { getDirection, setDirection } from '../../helpers/Utils';

// const currentUser = getCurrentUser();

const TopNav = ({
  token,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  // locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  // changeLocaleAction,
  getSettingsProfileListAction,
  profile,
  // currentUser,
}) => {
  useEffect(() => {
    getSettingsProfileListAction(token);
  }, [getSettingsProfileListAction]);
  const [isInFullScreen, setIsInFullScreen] = useState(false);

  // const handleChangeLocale = (_locale, direction) => {
  //   changeLocaleAction(_locale);

  //   const currentDirection = getDirection().direction;
  //   if (direction !== currentDirection) {
  //     setDirection(direction);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 500);
  //   }
  // };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    logoutUserAction(history);
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        <button
          className="header-icon btn btn-empty d-none d-sm-inline-block"
          type="button"
          id="fullScreenButton"
          onClick={toggleFullScreen}
        >
          {isInFullScreen ? (
            <i className="simple-icon-size-actual d-block" />
          ) : (
            <i className="simple-icon-size-fullscreen d-block" />
          )}
        </button>

        {/* *******Important***** ---- Don't Delete */}

        {/* <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
      </div>
      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        <div className="header-icons d-inline-block align-middle">
          {/* <TopnavNotifications /> */}
          {/* <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button> */}
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle
              className="p-0 d-inline-flex align-items-center"
              color="empty"
            >
              <span className="name mr-1 font-weight-bold text-capitalize">
                {profile?.data?.first_name} {profile?.data?.last_name}
              </span>
              <div className="d-inline-block">
                {profile?.data?.image ? (
                  <img alt="Profile" src={profile?.data?.image} />
                ) : (
                  <div
                    className="d-inline-flex align-items-center justify-content-center"
                    style={{
                      marginLeft: 10,
                      borderRadius: 30,
                      width: 40,
                      background: '#eee',
                      height: 40,
                      fontWeight: 'bolder',
                      fontSize: 16,
                      color: '#ff3848',
                      border: '1px solid #f1f1f1',
                    }}
                  >
                    {profile?.data?.first_name[0].toUpperCase()}
                    {profile?.data?.last_name !== ''
                      ? profile?.data?.last_name[0].toUpperCase()
                      : profile?.data?.first_name[1].toUpperCase()}
                  </div>
                )}
              </div>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem>
                <Link to={`/app/settings/profile`} className="pd">
                  <i className="fa fa-user-circle-o mr-2" />
                  <IntlMessages id="menu.myprofile" />
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()} className="pd">
                <i className="fa fa-sign-out mr-2" />
                <IntlMessages id="menu.signout" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale, profile } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    profile,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
    getSettingsProfileListAction: getSettingsProfileList,
  })(TopNav)
);
