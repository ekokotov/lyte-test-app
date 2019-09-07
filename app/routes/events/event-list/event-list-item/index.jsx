import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import Link from '../../../../ui-kit/route-link';
import styles from './style.m.scss';
import { formatEventPriceRange, formatReadableEventStartDate } from '../helper';
import { DEFAULT_LOGO_PLACEHOLDER } from './const';
import Routes from '../../../index';

@observer
class EventListItem extends Component {
  render() {
    const { event } = this.props;

    return (
      <div className={classNames('list-item', styles.list_item)} key={event.id}>
        <div className="columns">

          <div className="column is-narrow">
            <Link
              route={Routes.event}
              params={{ eventId: event.id }}
            >
              <figure className={classNames('image', styles.logo)}>
                <img src={event.logo_uri || DEFAULT_LOGO_PLACEHOLDER} alt="Event logo" />
              </figure>
            </Link>
          </div>

          <div className="column">
            <Link route={Routes.event} params={{ eventId: event.id }}>{event.name}</Link>
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
};

export default EventListItem;
