import React, { PureComponent } from 'react';
import Api from '../utils/api';
import Navigation from '../components/navigation';
// import PropTypes from 'prop-types';

class SignIn extends PureComponent {
  componentDidMount() {
    Api().then((client) => {
      client.app_info_list().then(console.log);
    });
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              {/*<h3 className="title has-text-grey">Sign-in</h3>*/}
              {/*<p className="subtitle has-text-grey">Please login to proceed.</p>*/}
              <div className="box">
                <form>
                  <div className="field">
                    <div className="control">
                      <input className="input is-large" type="email" placeholder="Your Email" />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input className="input is-large" type="password" placeholder="Your Password" />
                    </div>
                  </div>
                  <button className="button is-block is-primary is-medium is-fullwidth">Login</button>
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

SignIn.propTypes = {
  // id: PropTypes.number,
};

export default SignIn;
