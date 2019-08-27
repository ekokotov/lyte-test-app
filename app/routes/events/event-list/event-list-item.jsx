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
          {event.logo_uri && (
            <div className="column is-narrow">
              <figure className={classNames('image', styles.logo)}>
                <img src={event.logo_uri} />
              </figure>
            </div>
          )}
          <div className="column">
            <p>
              <a href={event.uri} target="_blank" rel="noopener noreferrer">
                {event.name}
              </a>
            </p>
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
              {' '}
              {event.ticket_price_currency}
              {` ${formatPrice(event.min_ticket_price, event.ticket_price_currency)} - ${formatPrice(
                event.max_ticket_price, event.ticket_price_currency
              )}`}
            </p>
            <div className="tags are-small">
              {event.category && (
                <span className="tag is-warning">{event.category.name}</span>
              )}
              {event.category && (
                <span className="tag">{event.organizer.name}</span>
              )}
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
