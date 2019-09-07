import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { getFormValues } from '../utils/form-data';
import LoginForm from '../ui-kit/login-form';

@inject('AuthStore')
@observer
class SignIn extends Component {
  submit = (event) => {
    event.preventDefault();
    this.props.AuthStore.signIn(getFormValues(event.target)); // BTW, we can use Refs in this case
  };

  render() {
    const { AuthStore: { errors, inProgress } } = this.props;

    return (
      <LoginForm
        onSubmit={this.submit}
        submitBtnText="Login"
        submitBtnIsDisabled={inProgress}
        submitBtnIsLoading={inProgress}
        errors={errors}
        submitBtnStyle="warning"
      />
    );
  }
}

SignIn.wrappedComponent.propTypes = {
  AuthStore: PropTypes.object.isRequired,
};

export default SignIn;
