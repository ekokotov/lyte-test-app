import React from 'react';
import PropTypes from 'prop-types';
import FormError from '../form-error';
import FormInput from '../form-input';
import FormButton from '../form-button';
import Navigation from '../login-navigation';

function LoginForm(props) {
  const loginErrors = props.errors && props.errors.email;
  const passwordErrors = props.errors && props.errors.password;

  return (
    <div className="container">
      <div className="column is-4 is-offset-4">
        <div className="box">
          <FormError errors={props.errors} />
          <form onSubmit={props.onSubmit}>
            <FormInput label="Email" name="email" placeholder="Your email" type="email" errors={loginErrors} />
            <FormInput label="Password" name="password" placeholder="Your password" type="password" errors={passwordErrors} />
            <FormButton type="submit" colorStyle={props.submitBtnStyle} isDisabled={props.submitBtnIsDisabled} isLoading={props.submitBtnIsLoading}>
              {props.submitBtnText}
            </FormButton>
          </form>
        </div>
        <Navigation />
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  submitBtnText: PropTypes.string.isRequired,
  submitBtnIsDisabled: PropTypes.bool,
  submitBtnIsLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitBtnStyle: PropTypes.oneOf(
    ['primary', 'warning', 'danger', 'info', 'success', 'link', 'light'],
  ),
};

LoginForm.defaultProps = {
  submitBtnIsDisabled: false,
  submitBtnIsLoading: false,
  submitBtnStyle: 'primary',
};

export default LoginForm;
