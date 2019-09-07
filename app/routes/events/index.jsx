import React, { Component } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import EventList from './event-list';
import EventFilters from './filters';
import style from './style.m.scss';
import Notification from '../../ui-kit/notification';
import Loading from '../../ui-kit/loading';

@inject('EventStore')
@observer
class Events extends Component {
  renderEventsLoading() {
    return this.props.EventStore.inProgress
      ? (
        <Loading
          title="Loading Events..."
          className={classNames({
            [style.loading]: this.props.EventStore.events.length,
          })}
        />
      ) : null;
  }

  render() {
    const {
      hasErrors, inProgress, events, totalEvents, filters, currentPage, setPage, reset,
      setLimit, setMaxPrice, setMinPrice, setSearchQuery,
    } = this.props.EventStore;

    return (
      <div className={classNames('container', style.root)}>

        <div className="columns">
          <div className="column menu">
            <EventFilters
              filters={filters}
              onReset={reset}
              onChangeLimit={setLimit}
              onChangeMaxPrice={setMaxPrice}
              onChangeMinPrice={setMinPrice}
              onChangeSearchQuery={setSearchQuery}
            />
          </div>

          <div className={classNames('column', 'events', 'is-three-quarters', style.event__list)}>
            {this.renderEventsLoading()}

            <EventList
              totalPages={totalEvents / filters.limit}
              currentPage={currentPage}
              events={events}
              inProgress={inProgress}
              onPageChange={setPage}
            />
          </div>

        </div>
        {hasErrors && <Notification colorStyle="danger">Sorry, but something went wrong...</Notification>}
      </div>
    );
  }
}

Events.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default Events;
