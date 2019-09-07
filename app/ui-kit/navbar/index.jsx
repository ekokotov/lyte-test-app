import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { inject, observer } from 'mobx-react';
import style from './style.m.scss';
import Link from '../route-link';
import Routes from '../../routes';

@inject('AuthStore')
@observer
class Navbar extends Component {
  state={ menuShow: false };

  toggleMenu = () => this.setState((prevState) => ({ menuShow: !prevState.menuShow }));

  render() {
    return (
      <nav className={classNames('navbar', 'is-warning', style.navbar)} role="navigation" aria-label="main navigation">
        <div className={classNames('navbar-brand', style.brand)}>
          <Link route={Routes.home} className="navbar-item">
            <img src="https://cdn-prod.lyte.com/marketing/images/lyte_logo_blk.svg" alt="Lyte Logo" />
          </Link>
          <a
            role="button"
            className={classNames('navbar-burger', 'burger', {
              'is-active': this.state.menuShow,
            })}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.toggleMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={classNames('navbar-menu', {
            'is-active': this.state.menuShow,
          })}
        >
          <div className="navbar-start">
            <Link
              route={Routes.home}
              className="navbar-item"
              activeClass={style.nav_active}
              onClick={this.toggleMenu}
            >
              Events
            </Link>
          </div>

          <div className="navbar-end">
            {!this.props.AuthStore.token ? (
              <>
                <Link route={Routes.signIn} className="navbar-item" activeClass={style.nav_active} onClick={this.toggleMenu}>
                Sign in
                </Link>
              </>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <button type="button" className={classNames('button', 'is-outlined', style.logout)} onClick={this.props.AuthStore.logout}>
                   Logout
                  </button>
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
