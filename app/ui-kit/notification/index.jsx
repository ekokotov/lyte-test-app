import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.m.scss';

/* The best solution of course is create notification wrapper and show list of notifications */
class Notification extends Component {
  state = { isOpen: true };

  closeNotification = () => this.setState({ isOpen: false });

  createNotification() {
    return (
      <div className={classNames(`notification is-${this.props.colorStyle}`, style.root)}>
        <button className="delete" onClick={this.closeNotification} />
        {this.props.children}
      </div>
    );
  }

  render() {
    const domElement = document.getElementById('portal');
    if (!this.state.isOpen) {
      return null;
    }
    return createPortal(
      this.createNotification(),
      domElement,
    );
  }
}

Notification.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  colorStyle: PropTypes.oneOf(['primary', 'warning', 'danger', 'info', 'success', 'link', 'light']),
};

Notification.defaultProps = {
  colorStyle: 'warning',
};

export default Notification;
