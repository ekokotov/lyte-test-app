import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Navigation from '../ui-kit/login-navigation';
import FormError from '../ui-kit/form-error';
import FormInput from '../ui-kit/form-input';
import FormButton from '../ui-kit/form-button';
import { getFormValues } from '../utils/form-data';

@inject('AuthStore')
@observer
class SignIn extends Component {
  submit = (event) => {
    event.preventDefault();
    // BTW, we can use Refs in this case
    const formData = getFormValues(event.target);
    this.props.AuthStore.signIn(formData);
  };

  render() {
    const { AuthStore: { errors, inProgress } } = this.props;

    return (
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <FormError errors={errors} />
            <form onSubmit={this.submit}>
              <FormInput label="Email" name="email" placeholder="Your email" type="email" errors={errors && errors.email} />
              <FormInput label="Password" name="password" placeholder="Your password" type="password" errors={errors && errors.password} />
              <FormButton type="submit" colorStyle="warning" isDisabled={inProgress} isLoading={inProgress}>
                    Login
              </FormButton>
            </form>
          </div>
          <Navigation />
        </div>
      </div>
    );
  }
}

SignIn.wrappedComponent.propTypes = {
  AuthStore: PropTypes.object.isRequired,
};

export default SignIn;
