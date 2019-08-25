import React from 'react';
import PropTypes from 'prop-types';

const FormError = (props) => {
  const formHasError = props.errors && Object.keys(props.errors).length;
  const nonFieldErrors = props.errors.non_field_errors && props.errors.non_field_errors.length;

  return (
    <>
      {!!formHasError && <h3 className="has-text-danger is-size-3 has-text-centered">Sign-in Error</h3>}
      {nonFieldErrors && props.errors.non_field_errors.map((error) => <p key={error} className="help is-danger has-text-centered">{error}</p>)}
    </>
  );
};

FormError.propTypes = {
  errors: PropTypes.object,
};

FormError.defaultProps = {
  errors: {},
};

export default FormError;
