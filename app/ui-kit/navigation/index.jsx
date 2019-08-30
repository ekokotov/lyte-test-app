import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './style.m.scss';

function Navigation() {
  return (
    <nav className={classNames('breadcrumb', 'is-centered', styles.root)} aria-label="breadcrumbs">
      <ul>
        <li>
          <NavLink className={styles.link} to="/sign-in" activeClassName={styles.link__active}>
            Sign-in
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/sign-up" activeClassName={styles.link__active}>
            Sign-up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
