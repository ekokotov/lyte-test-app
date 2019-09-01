import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Pagination from '../../../ui-kit/pagination';
import EventListItem from './event-list-item';

function EventList(props) {
  const {
    events, onPageChange, totalPages, currentPage, inProgress,
  } = props;

  if (!events.length && !inProgress) {
    return <div className="no_results">No results...</div>;
  }

  return (
    <>
      {!!events.length && (
        <div className="list is-hoverable">
          {events.map((event) => <EventListItem event={event} key={event.id} />)}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination pageCount={totalPages} onPageChange={onPageChange} forcePage={currentPage} />
      )}
    </>
  );
}

EventList.propTypes = {
  totalPages: PropTypes.number.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default observer(EventList);
