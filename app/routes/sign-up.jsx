import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Navigation from '../ui-kit/login-navigation';
import FormError from '../ui-kit/form-error';
import FormInput from '../ui-kit/form-input';
import FormButton from '../ui-kit/form-button';
import { getFormValues } from '../utils/form-data';

@inject('AuthStore')
@withRouter
@observer
class Signup extends Component {
  componentWillUnmount() {
    this.props.AuthStore.clearErrors();
  }

  submit = async (event) => {
    event.preventDefault();
    const formData = getFormValues(event.target);
    const token = await this.props.AuthStore.signUp(formData);

    if (token) {
      this.props.history.push('/event');
    }
  };

  render() {
    const { AuthStore } = this.props;
    return (
      <div className="container">
        <FormError errors={AuthStore.errors} />
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form onSubmit={this.submit}>
              <FormInput label="Email" name="email" placeholder="Your email" type="email" errors={AuthStore.errors.email} />
              <FormInput label="Password" name="password" placeholder="Your password" type="password" errors={AuthStore.errors.password} />
              <FormButton type="submit" colorStyle="success" isDisabled={AuthStore.inProgress} isLoading={AuthStore.inProgress}>
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

Signup.wrappedComponent.propTypes = {
  history: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
};

export default Signup;
