import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EventCard from './card';
import style from './style.m.scss';
import Loading from '../../ui-kit/loading';

@inject('EventStore')
@withRouter
@observer
class Event extends PureComponent {
  componentDidMount() {
    this.props.EventStore.getById(this.props.match.params.eventId);
  }

  render() {
    const { selectedEvent: event, inProgress } = this.props.EventStore;
    if (inProgress || !event) {
      return <Loading title="Loading Event..." />;
    }
    return (
      <div className={classNames('container', style.root)}>
        <div className="columns">
          <div className="column is-narrow">
            <EventCard event={event} />
          </div>
          {event.description_html && (
            <div className="column">
              <div
                className="box"
                dangerouslySetInnerHTML={{ __html: event.description_html }}
              />
            </div>
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
