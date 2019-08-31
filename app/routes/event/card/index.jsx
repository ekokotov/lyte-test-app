import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import style from './style.m.scss';
import {
  formatEventDateRange,
  formatEventPriceRange,
  formatReadableEventStartDate,
} from '../../events/event-list/helper';
import Divider from '../../../ui-kit/card-divider';

@inject('AuthStore')
@withRouter
@observer
class EventCard extends Component {
  render() {
    const { event, location } = this.props;

    return (
      <div className={classNames('card', 'is-shadowless', style.card)}>
        <h3 className="has-text-centered has-text-weight-bold">{event.name}</h3>
        {event.logo_uri && (
          <div className={classNames('card-image', style.card__logo)}>
            <figure className="image is-4by3">
              <img src={event.logo_uri} alt="Event Logo" />
            </figure>
          </div>
        )}

        <Divider />

        <div className={classNames('card-content', style.card__content)}>
          <div className="media">
            {!!event.organizer.logo_uri.length && (
            <div className="media-left">
              <figure className={classNames('image', style.card__organizer__logo)}>
                <img src={event.organizer.logo_uri} alt="Organizer logo" />
              </figure>
            </div>
            )}
            <div className="media-content">
              <p className="is-4 is-dark">{event.organizer.name}</p>
              {event.category && <span className="tag is-warning">{event.category.name}</span>}
            </div>
          </div>
        </div>

        <Divider />

        <div className={classNames('card-content', style.card__content)}>
          <div className="content">
            <time dateTime={event.start_time} className="has-text-danger">
              <p className="has-text-weight-bold">
                {formatEventDateRange(event.start_time, event.finish_time, 'MMM dd, HH:MM a')}
              </p>
              <p className="subtitle is-7 has-text-danger">{formatReadableEventStartDate(event.start_time)}</p>
            </time>
            <p className={classNames('has-text-weight-bold', style.price)}>
              <span className="icon">
                <i className="icon ion-md-card" />
              </span>
              {formatEventPriceRange(event.min_ticket_price, event.max_ticket_price,
                event.ticket_price_currency)}
            </p>
          </div>
        </div>

        <footer className={classNames('card-footer', style.card__footer)}>
          {event.uri && (
            <a
              className={classNames('card-footer-item', style.tickets__link)}
              target="_blank"
              href={event.uri}
              rel="noopener noreferrer"
            >
              <span className="icon is-small">
                <i className="icon ion-md-pricetags" />
              </span>
              <span>&nbsp;See tickets</span>
            </a>
          )}
          {this.props.AuthStore.token && (
            <Link to={`${location.pathname}/edit`} className="card-footer-item">
              <span className="icon is-small">
                <i className="icon ion-md-create" />
              </span>
              <span>&nbsp;Edit event</span>
            </Link>
          )}
        </footer>

      </div>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  AuthStore: PropTypes.object,
  location: PropTypes.object,
};

export default EventCard;
