import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function FormButton(props) {
  return (
  // eslint-disable-next-line react/button-has-type
    <button
      type={props.type}
      disabled={props.isDisabled}
      className={classNames('button', 'is-block', `is-${props.colorStyle}`, 'is-medium', 'is-fullwidth', {
        'is-loading': props.isLoading,
      })}
    >
      {props.children}
    </button>
  );
}

FormButton.propTypes = {
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button']),
  colorStyle: PropTypes.oneOf(['primary', 'warning', 'danger', 'info', 'success', 'link', 'light']),
  children: PropTypes.string.isRequired,
};

FormButton.defaultProps = {
  isLoading: false,
  isDisabled: false,
  type: 'button',
  colorStyle: 'primary',
};

export default FormButton;
