import React from 'react';
import classNames from 'classnames';
import { Link } from 'mobx-router';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const RouteLink = inject((store) => ({ store }))(observer((props) => (
  <Link
    view={props.route}
    params={props.params}
    router={props.store.router}
    store={props.store}
    className={classNames(props.className, {
      [props.activeClass]: props.route === props.store.router.currentView,
    })}
  >
    <div onClick={props.onClick}>
      {props.children}
    </div>
  </Link>
)));

RouteLink.propTypes = {
  route: PropTypes.object.isRequired,
  params: PropTypes.object,
  store: PropTypes.object,
  activeClass: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RouteLink;
