import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.m.scss';

const FormError = (props) => {
  const errors = props.errors.non_field_errors;
  const nonFieldErrors = errors && errors.length;

  if (!nonFieldErrors) {
    return null;
  }
  return errors.map((error) => <h3 key={error} className={classNames('title', 'has-text-centered', 'is-6', style.root)}>{error}</h3>);
};

FormError.propTypes = {
  errors: PropTypes.object,
};

FormError.defaultProps = {
  errors: {},
};

export default FormError;
