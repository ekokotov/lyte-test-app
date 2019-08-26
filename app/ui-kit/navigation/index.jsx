import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './style.m.scss';

@inject('AuthStore')
@observer
class Navigation extends Component {
  state = { breadcrumbs: [] };

  static getDerivedStateFromProps(props) {
    if (props.AuthStore.token) {
      return {
        breadcrumbs: [{ name: 'Logout', path: '/sign-in', handler: props.AuthStore.logout }],
      };
    }
    return {
      breadcrumbs: [
        { name: 'Sign-in', path: '/sign-in' },
        { name: 'Sign-up', path: '/sign-up' },
      ],
    };
  }

  render() {
    return (
      <nav className={classNames('breadcrumb', 'is-centered', styles.root)} aria-label="breadcrumbs">
        <ul>
          {this.state.breadcrumbs.map((route) => (
            <li key={route.path}>
              <NavLink
                className={styles.link}
                to={route.path}
                activeClassName={styles.link__active}
                onClick={route.handler}
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Navigation.wrappedComponent.propTypes = {
  AuthStore: PropTypes.object.isRequired,
};

export default Navigation;
