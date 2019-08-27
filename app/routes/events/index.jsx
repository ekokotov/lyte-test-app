import React, { Component } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import EventList from './event-list';
import EventFilters from './filters';
import style from './style.m.scss';

@inject('EventStore')
class Events extends Component {
  componentDidMount() {
    this.props.EventStore.getEvents();
  }

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

Events.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default Events;
