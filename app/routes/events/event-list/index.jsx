import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Pagination from '../../../ui-kit/pagination';
import EventListItem from './event-list-item';
import Loading from '../../../ui-kit/loading';

@inject('EventStore')
@observer
class EventList extends Component {
  render() {
    const {
      events, filters, setPage, inProgress, totalEvents, currentPage,
    } = this.props.EventStore;
    const pages = totalEvents / filters.limit;

    if (inProgress) {
      return <Loading title="Loading Events..." />;
    } if (!events.length) {
      return <div className="no_results">No results...</div>;
    }

    return (
      <>
        <div className="list is-hoverable">
          {events.map((event) => <EventListItem event={event} key={event.id} />)}
        </div>
        {pages > 1 && (
        <Pagination
          pageCount={pages}
          onPageChange={setPage}
          forcePage={currentPage}
        />
        )}
      </>
    );
  }
}

EventList.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default EventList;
