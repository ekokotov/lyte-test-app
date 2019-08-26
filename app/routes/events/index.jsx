import React, { Component } from 'react';
import classNames from 'classnames';
import EventList from './event-list';
import EventFilters from './filters';
import style from './style.m.scss';

class Events extends Component {
  render() {
    return (
      <section className={classNames('hero', 'is-fullheight', 'is-primary', style.root)}>
        <div className={classNames('hero-body', style.hero)}>
          <div className="container">
            <div className="columns">
              <div className="column menu">
                <EventFilters />
              </div>
              <div className="column events is-three-quarters">
                <EventList />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Events;
