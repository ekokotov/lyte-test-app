import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.m.scss';

function Loading(props) {
  return (
    <div className={classNames(style.progress, props.className)}>
      <span className={classNames('icon', style.progress__icon)}>
        <i className="icon ion-md-refresh" />
      </span>
      {props.title}
    </div>
  );
}

Loading.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

Loading.defaultProps = {
  title: 'Loading...',
};

export default Loading;
