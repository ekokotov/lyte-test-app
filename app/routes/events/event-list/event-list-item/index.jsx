import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import styles from './style.m.scss';
import { formatEventPriceRange, formatReadableEventStartDate } from '../helper';
import { DEFAULT_LOGO_PLACEHOLDER } from './const';

@withRouter
class EventListItem extends Component {
  render() {
    const { event, location } = this.props;

    return (
      <div className={classNames('list-item', styles.list_item)} key={event.id}>
        <div className="columns">

          <div className="column is-narrow">
            <Link to={`${location.pathname}/${event.id}`}>
              <figure className={classNames('image', styles.logo)}>
                <img src={event.logo_uri || DEFAULT_LOGO_PLACEHOLDER} alt="Event logo" />
              </figure>
            </Link>
          </div>

          <div className="column">
            <Link to={`${location.pathname}/${event.id}`}>
              {event.name}
            </Link>
            <p className="is-size-7 has-text-danger">
              <span className="icon">
                <i className="icon ion-md-calendar" />
              </span>
              {' '}
              {formatReadableEventStartDate(event.start_time)}
            </p>
            <p className="is-size-7 has-text-danger">
              <span className="icon">
                <i className="icon ion-md-card" />
              </span>
              {formatEventPriceRange(event.min_ticket_price, event.max_ticket_price, event.ticket_price_currency)}
            </p>
            <div className={classNames('tags', styles.tags)}>
              {event.category && <span className="tag is-warning">{event.category.name}</span>}
              <span className="tag">{event.organizer.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventListItem.propTypes = {
  event: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default EventListItem;
