import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Pagination from '../../../ui-kit/pagination';
import styles from './style.m.scss';
import EventListItem from './event-list-item';

@inject('EventStore')
@observer
class EventList extends Component {
  render() {
    const {
      events, options, setPage, inProgress, totalEvents
    } = this.props.EventStore;
    return (
      <div className={styles.root}>
        {!events.length && !inProgress && (
        <div className="no_results">No results...</div>
        )}

        {!!events.length
        && (
        <>
          <div className="list is-hoverable">
            {events.map((event) => <EventListItem event={event} key={event.id} />)}
          </div>
          <Pagination pageCount={totalEvents / options.limit} onPageChange={setPage} />
        </>
        )}
      </div>
    );
  }
}

EventList.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default EventList;
