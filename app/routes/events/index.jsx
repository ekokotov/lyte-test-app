import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventList from './event-list';
import EventFilters from './filters';
import style from './style.m.scss';
import Notification from '../../ui-kit/notification';
import Loading from '../../ui-kit/loading';
import {
  getEvents, setMaxPrice, setLimit, setPage, setMinPrice, setSearchQuery, resetFilters,
} from '../../store/events/actions';
import { hasEventsErrors } from '../../store/events/selectors';

class Events extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  renderEventsLoading() {
    return this.props.inProgress
      ? (
        <Loading
          title="Loading Events..."
          className={classNames({
            [style.loading]: this.props.events.length,
          })}
        />
      ) : null;
  }

  render() {
    const {
      hasErrors, inProgress, events, totalEvents, filters,
    } = this.props;

    return (
      <div className={classNames('container', style.root)}>

        <div className="columns">
          <div className="column menu">
            <EventFilters
              filters={filters}
              onReset={this.props.resetFilters}
              onChangeLimit={this.props.setLimit}
              onChangeMaxPrice={this.props.setMaxPrice}
              onChangeMinPrice={this.props.setMinPrice}
              onChangeSearchQuery={this.props.setSearchQuery}
            />
          </div>

          <div className={classNames('column', 'events', 'is-three-quarters', style.event__list)}>
            {this.renderEventsLoading()}

            <EventList
              totalPages={totalEvents / filters.limit}
              currentPage={filters.currentPage}
              events={events}
              inProgress={inProgress}
              onPageChange={this.props.setPage}
            />
          </div>

        </div>
        {hasErrors
        && <Notification colorStyle="danger">Sorry, but something went wrong...</Notification>}
      </div>
    );
  }
}

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.array,
  inProgress: PropTypes.bool,
  hasErrors: PropTypes.bool,
  filters: PropTypes.shape({
    searchQuery: PropTypes.string,
    currentPage: PropTypes.number,
    minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    limit: PropTypes.number,
  }).isRequired,
  currentPage: PropTypes.number,
  totalEvents: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
  setMaxPrice: PropTypes.func.isRequired,
  setMinPrice: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

Events.defaultProps = {
  events: [],
  inProgress: false,
};

export default connect((store) => ({
  events: store.events.events,
  inProgress: store.events.inProgress,
  hasErrors: hasEventsErrors(store),
  totalEvents: store.events.totalEvents,
  filters: store.events.filters,
}), {
  getEvents,
  setMaxPrice,
  setMinPrice,
  setPage,
  setSearchQuery,
  setLimit,
  resetFilters,
})(Events);
