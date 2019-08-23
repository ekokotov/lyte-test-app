import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './navigation.m.scss';

class Navigation extends PureComponent {
  render() {
    return (
      <nav className={classNames('breadcrumb', 'is-centered', styles.root)} aria-label="breadcrumbs">
        <ul>
          <li>
            <NavLink className={styles.link} to="/sign-in" activeClassName={styles.link__active}>Sign-in</NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" activeClassName={styles.link__active}>Sign-up</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {};

export default Navigation;
