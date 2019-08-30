import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import style from './style.m.scss';
import { formatPrice } from '../events/event-list/helper';

@inject('EventStore')
@withRouter
@observer
class Event extends PureComponent {
  componentDidMount() {
    this.props.EventStore.getById(this.props.match.params.eventId);
  }

  render() {
    const { selectedEvent: event } = this.props.EventStore;

    return (
      <div className={classNames('container', style.container)}>
        <div className="box">
          {!event && 'Loading...'}
          {event && (
          <div className="columns">
            <div className="column is-two-thirds">
              <h3>{event.name}</h3>
              <p className="has-text-danger">
                {distanceInWordsToNow(new Date(event.start_time), {
                  addSuffix: true,
                })}
                {` (${format(new Date(event.start_time), 'MMM dd, HH:MM')} -  ${format(new Date(event.finish_time), 'MMM dd, HH:MM')})`}
              </p>

              {event && event.category
                  && (
                  <span className="tag is-warning">{event.category.name}</span>
                  )}
            </div>
            <div className="column has-text-right-tablet">
              {event.uri && (
              <a className="button is-danger is-outlined" href={event.uri} rel="noopener noreferrer">
                <span className="icon is-small">
                  <i className="icon ion-md-pricetags" />
                </span>
                <span>See tickets</span>
              </a>
              )}
              <p className={classNames('has-text-weight-light', style.price)}>
                <span className="icon">
                  <i className="icon ion-md-card" />
                </span>
                {` ${formatPrice(event.min_ticket_price, event.ticket_price_currency)} - ${formatPrice(
                  event.max_ticket_price, event.ticket_price_currency,
                )}`}
              </p>
            </div>
          </div>
          )}
        </div>
        <div className="box">
          {event && event.organizer
              && (
              <div>
                <span className="has-text-weight-semibold">Organizer: </span>
                {' '}
                <span className="tag">{event.organizer.name}</span>
              </div>
              )}

          {event && event.description_html
              && (
              <div
                className={style.description}
                dangerouslySetInnerHTML={{ __html: event.description_html }}
              />
              )}
        </div>
      </div>
    );
  }
}

Event.wrappedComponent.propTypes = {
  match: PropTypes.object.isRequired,
  EventStore: PropTypes.object.isRequired,
};

export default Event;
