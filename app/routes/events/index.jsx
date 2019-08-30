import React, { Component } from 'react';
import classNames from 'classnames';
import { inject } from 'mobx-react';
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
      <div className={classNames('container', style.root)}>
        <div className="columns">
          <div className="column menu">
            <EventFilters />
          </div>
          <div className="column events is-three-quarters">
            <EventList />
          </div>
        </div>
      </div>
    );
  }
}

Events.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default Events;
