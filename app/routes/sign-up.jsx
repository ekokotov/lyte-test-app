import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Navigation from '../ui-kit/navigation';
import FormError from '../ui-kit/form-error';
import FormInput from '../ui-kit/form-input';
import FormButton from '../ui-kit/form-button';

@inject('AuthStore')
@withRouter
@observer
class Signup extends Component {
  email = React.createRef();

  password = React.createRef();

  componentWillUnmount() {
    this.props.AuthStore.clearErrors();
  }

  submit = async (event) => {
    event.preventDefault();
    const email = this.email.current.value;
    const password = this.password.current.value;
    const token = await this.props.AuthStore.signUp(email, password);

    if (token) {
      this.props.history.push('/event');
    }
  };

  inputHasError(inputName) {
    const { AuthStore } = this.props;

    return AuthStore.errors[inputName] && AuthStore.errors[inputName].length;
  }

  render() {
    const { AuthStore } = this.props;
    return (
      <section className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div className="container">
            <FormError errors={AuthStore.errors} />
            <div className="column is-4 is-offset-4">
              <div className="box">
                <form onSubmit={this.submit}>
                  <FormInput
                    label="Email"
                    name="email"
                    placeholder="Your email"
                    type="email"
                    errors={AuthStore.errors.email}
                    ref={this.email}
                  />

                  <FormInput
                    label="Password"
                    name="password"
                    placeholder="Your password"
                    type="password"
                    errors={AuthStore.errors.password}
                    ref={this.password}
                  />

                  <FormButton
                    type="submit"
                    colorStyle="success"
                    isDisabled={AuthStore.inProgress}
                    isLoading={AuthStore.inProgress}
                  >
                    Register
                  </FormButton>
                </form>
              </div>
              <Navigation />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Signup.wrappedComponent.propTypes = {
  history: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
};

export default Signup;
