import React, { PureComponent, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Navigation from '../components/navigation';

@inject('EventStore')
// @withRouter
@observer
class EventList extends PureComponent {
  render() {
    console.log(this.props.EventStore.events[0]);
    return (
      <>
        {this.props.EventStore.events.length}
        <Navigation />
      </>
    );
  }
}

EventList.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default EventList;
