import React from 'react';
import styles from './style.m.scss';
import Link from '../route-link';
import Routes from '../../routes';

function Navigation() {
  return (
    <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
      <ul>
        <li>
          <Link route={Routes.signIn} activeClass='active'>Sign in</Link>
        </li>
        <li>
          <Link route={Routes.signUp} activeClass='active'>Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
