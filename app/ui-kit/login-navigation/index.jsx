import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.m.scss';

function Navigation() {
  return (
    <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
      <ul>
        <li>
          <NavLink to="/sign-in" activeClassName={styles.link__active}>
            Sign-in
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" activeClassName={styles.link__active}>
            Sign-up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
