import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { getFormValues } from '../utils/form-data';
import LoginForm from '../ui-kit/login-form';

@inject('AuthStore')
@observer
class SignUp extends Component { // extend from sign-in or visa-versa
  submit = (event) => {
    event.preventDefault();
    this.props.AuthStore.signUp(getFormValues(event.target));
  };

  render() {
    const { AuthStore: { errors, inProgress } } = this.props;

    return (
      <LoginForm
        onSubmit={this.submit}
        submitBtnText="Register"
        submitBtnIsDisabled={inProgress}
        submitBtnIsLoading={inProgress}
        errors={errors}
        submitBtnStyle="info"
      />
    );
  }
}

SignUp.wrappedComponent.propTypes = {
  AuthStore: PropTypes.object.isRequired,
};

export default SignUp;
