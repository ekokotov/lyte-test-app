import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import EventCard from './card';
import style from './style.m.scss';
import Loading from '../../ui-kit/loading';
import Notification from '../../ui-kit/notification';

@inject('EventStore', 'AuthStore')
@withRouter
@observer
class Event extends Component {
  componentDidMount() {
    this.props.EventStore.getById(this.props.match.params.eventId);
  }

  renderEventDescription = (event) => {
    if (!event.description_html) {
      return null;
    }
    const sanitizedDescription = DOMPurify.sanitize(event.description_html);
    return (
      <div className="column">
        <div className="box" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>
    );
  };

  render() {
    const { selectedEvent: event, inProgress, hasErrors } = this.props.EventStore;

    if (hasErrors) {
      return <Notification colorStyle="danger">Sorry, but something went wrong...</Notification>;
    }

    if ((inProgress && !hasErrors) || !event) {
      return <Loading title="Loading Event..." />;
    }

    return (
      <div className={classNames('container', style.root)}>
        <div className="columns">
          <div className="column is-narrow">
            <EventCard event={event} authenticated={!!this.props.AuthStore.token} />
          </div>
          {this.renderEventDescription(event)}
        </div>
      </div>
    );
  }
}

Event.wrappedComponent.propTypes = {
  match: PropTypes.object.isRequired,
  EventStore: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
};

export default Event;
