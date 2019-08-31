import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.m.scss';

const FormError = (props) => {
  const nonFieldErrors = props.errors.non_field_errors && props.errors.non_field_errors.length;
  if (!nonFieldErrors) {
    return null;
  }
  return props.errors.non_field_errors.map((error) => <h3 key={error} className={classNames('title', 'has-text-centered', 'is-6', style.root)}>{error}</h3>);
};

FormError.propTypes = {
  errors: PropTypes.object,
};

FormError.defaultProps = {
  errors: {},
};

export default FormError;
