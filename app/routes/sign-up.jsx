import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigation from '../ui-kit/login-navigation';
import FormError from '../ui-kit/form-error';
import FormInput from '../ui-kit/form-input';
import FormButton from '../ui-kit/form-button';
import { getFormValues } from '../utils/form-data';
import { reset, startSignUp } from '../store/auth/actions';

class SignUp extends Component { // extend from sign-in or visa-versa
  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/event');
    }
  }

  componentWillUnmount = () => this.props.reset();

  submit = (event) => {
    event.preventDefault();

    this.props.signUp(getFormValues(event.target));
  };

  render() {
    const { errors, inProgress } = this.props;

    return (
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <FormError errors={errors} />
            <form onSubmit={this.submit}>
              <FormInput label="Email" name="email" placeholder="Your email" type="email" errors={errors && errors.email} />
              <FormInput label="Password" name="password" placeholder="Your password" type="password" errors={errors && errors.password} />
              <FormButton type="submit" colorStyle="info" isDisabled={inProgress} isLoading={inProgress}>
                    Register
              </FormButton>
            </form>
          </div>
          <Navigation />
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  errors: PropTypes.object,
  inProgress: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  reset: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connect((store) => ({
  inProgress: store.auth.inProgress,
  errors: store.auth.errors,
  isAuthenticated: !!store.auth.token,
}), {
  reset,
  signUp: startSignUp,
})(withRouter(SignUp));
