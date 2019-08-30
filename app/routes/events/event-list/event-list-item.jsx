import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import styles from './style.m.scss';
import { formatPrice } from './helper';

class EventListItem extends Component {
  render() {
    const { event } = this.props;

    return (
      <div className={classNames('list-item', styles.list_item)} key={event.id}>
        <div className="columns">
          {event.logo_uri.length && (
            <div className="column is-narrow">
              <a href={`event/${event.id}`}>
                <figure className={classNames('image', styles.logo)}>
                  <img src={event.logo_uri} alt="Event logo" />
                </figure>
              </a>
            </div>
          )}
          <div className="column">
            <a href={`event/${event.id}`}>
              {event.name}
            </a>
            <p className="is-size-7 has-text-danger">
              <span className="icon">
                <i className="icon ion-md-calendar" />
              </span>
              {' '}
              {distanceInWordsToNow(new Date(event.start_time), {
                addSuffix: true,
              })}
            </p>
            <p className="is-size-7 has-text-danger">
              <span className="icon">
                <i className="icon ion-md-card" />
              </span>
              {` ${formatPrice(event.min_ticket_price, event.ticket_price_currency)} - ${formatPrice(
                event.max_ticket_price, event.ticket_price_currency,
              )}`}
            </p>
            <div className="tags are-small">
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
};

export default EventListItem;
