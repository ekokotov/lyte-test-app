import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import style from './style.m.scss';
import FormInput from '../../../ui-kit/form-input';
import FormButton from '../../../ui-kit/form-button';
import { getFormValues } from '../../../utils/form-data';
import Loading from '../../../ui-kit/loading';
import Notification from '../../../ui-kit/notification';

@inject('EventStore')
@withRouter
@observer
class EditEvent extends Component {
  componentDidMount() {
    const { EventStore } = this.props;
    const { eventId } = this.props.match.params;
    if (!EventStore.selectedEvent) {
      EventStore.getById(eventId);
    }
  }

  updateEvent = async (e) => {
    e.preventDefault();
    const { EventStore, match: { params: { eventId } } } = this.props;
    const updatedEvent = await EventStore.updateEvent(eventId, getFormValues(e.target));

    if (updatedEvent) {
      this.props.history.push(`/event/${eventId}`);
    }
  };

  cancelUpdate = () => this.props.history.push(`/event/${this.props.match.params.eventId}`);

  editEvent = (e) => this.props.EventStore.updateSelectedEvent(e.target.name, e.target.value);

  render() {
    const {
      EventStore: {
        selectedEvent: event, inProgress, errors, hasGlobalError,
      },
    } = this.props;

    if (!event) {
      return <Loading />;
    }

    return (
      <div className={classNames('container', style.root)}>
        <div className="columns is-centered">
          <div className={classNames('column', style.column)}>
            <h2 className="title">Edit event</h2>
            <form className="box" onSubmit={this.updateEvent} onInput={this.editEvent}>
              <FormInput placeholder="min length: 1, max length: 255" name="name" label="Event name" type="text" size="normal" minLength="1" maxLength="255" defaultValue={event.name} errors={errors.name} />
              <FormInput placeholder="min length: 5, max length: 200" name="uri" label="Event URI" type="text" size="normal" minLength="5" maxLength="200" defaultValue={event.uri} errors={errors.uri} />
              <FormInput placeholder="min length: 5, max length: 200" name="logo_uri" label="Event Logo" type="text" size="normal" minLength="5" maxLength="200" defaultValue={event.logo_uri} errors={errors.logo_uri} />
              {event.logo_uri && (
              <figure className="image field">
                <img src={event.logo_uri} alt="Event Logo" />
              </figure>
              )}

              <div className={classNames('field is-horizontal', style.price__block)}>
                <div className="field-body">
                  <FormInput horizontal placeholder="BYN, USD" name="ticket_price_currency" label="Currency" type="text" size="normal" minLength="1" maxLength="3" defaultValue={event.ticket_price_currency} errors={errors.ticket_price_currency} />
                  <FormInput horizontal placeholder="0-100" name="min_ticket_price" label="From" type="number" size="normal" defaultValue={event.min_ticket_price} errors={errors.min_ticket_price} />
                  <FormInput horizontal placeholder="0-100" name="max_ticket_price" label="To" type="number" size="normal" defaultValue={event.max_ticket_price} errors={errors.max_ticket_price} />
                </div>
              </div>

              <div className="field is-grouped">
                <p className="control is-expanded" onClick={this.cancelUpdate}>
                  <FormButton type="button" colorStyle="light">
                      Cancel
                  </FormButton>
                </p>
                <p className="control is-expanded">
                  <FormButton type="submit" colorStyle="warning" isDisabled={inProgress} isLoading={inProgress}>
                    Update
                  </FormButton>
                </p>
              </div>
            </form>
          </div>
        </div>
        {hasGlobalError && <Notification colorStyle="danger">Sorry, but something went wrong...</Notification>}
      </div>
    );
  }
}

EditEvent.wrappedComponent.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
  EventStore: PropTypes.object.isRequired,
};

export default EditEvent;
