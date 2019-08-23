import React, { PureComponent } from 'react';
import Navigation from '../components/navigation';
// import PropTypes from 'prop-types';

class SignUp extends PureComponent {
  render() {
    return (
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                {/*<h3 className="title has-text-grey">Sign-up</h3>*/}
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
                    <button className="button is-block is-info is-medium is-fullwidth">Register</button>
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

SignUp.propTypes = {
  // id: PropTypes.number,
};

export default SignUp;
