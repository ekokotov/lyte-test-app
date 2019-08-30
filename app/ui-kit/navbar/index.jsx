import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import style from './style.m.scss';

@inject('AuthStore')
@observer
@withRouter
class Navbar extends Component {
  render() {
    return (
      <nav className={classNames('navbar', 'is-warning', style.nav)} role="navigation" aria-label="main navigation">
        <div className={classNames('navbar-brand', style.brand)}>
          <NavLink to="/events" className="navbar-item">
            <img src="https://cdn-prod.lyte.com/marketing/images/lyte_logo_blk.svg" alt="Lyte Logo" />
          </NavLink>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/events" className="navbar-item" activeClassName={style.nav_active}>
              Events
            </NavLink>
          </div>

          <div className="navbar-end">
            {!this.props.AuthStore.token ? (
              <>
                <NavLink to="/sign-in" className="navbar-item" activeClassName={style.nav_active}>
                Sign-in
                </NavLink>

                <NavLink to="/sign-up" className="navbar-item" activeClassName={style.nav_active}>
                Sign-up
                </NavLink>
              </>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <NavLink to="/sign-in" className="button is-danger" onClick={this.props.AuthStore.logout}>
                    <span className="icon is-small">
                      <i className="icon ion-md-log-out" />
                    </span>
&nbsp;Logout
                  </NavLink>
                </div>
              </div>
            )}

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  AuthStore: PropTypes.object,
};

export default Navbar;
