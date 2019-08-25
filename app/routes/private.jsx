import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
class PrivateRoute extends PureComponent {
  render() {
    const { component: Component, AuthStore, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(compProps) => (AuthStore.token ? <Component {...compProps} />
          : <Redirect to="/sign-in" />)}
      />
    );
  }
}

PrivateRoute.wrappedComponent.propTypes = {
  component: PropTypes.func.isRequired,
  AuthStore: PropTypes.object.isRequired,
};

export default PrivateRoute;
