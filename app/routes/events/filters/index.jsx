import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './style.m.scss';
import FormButtonGroup from '../../../ui-kit/form-button-group';
import FormInput from '../../../ui-kit/form-input';

@inject('EventStore')
@observer
class EventFilters extends Component {
  searchLimitOptions = [5, 10, 25, 50]; // export to constants

  render() {
    const {
      options,
      setLimit,
      setSearchQuery,
      setMinPrice,
      setMaxPrice,
      reset,
    } = this.props.EventStore;
    return (
      <nav className={classNames('list', styles.root)}>
        <p className={classNames('panel-heading', styles.panel_heading)}>
          <span className="icon">
            <i className="icon ion-md-options" />
          </span>
          {' Filters'}
        </p>
        <div className={classNames('panel-block', styles.panel_block)}>
          <div className="control">
            <FormInput placeholder="Search event" name="search" type="text" size="normal" onChange={setSearchQuery} value={options.searchQuery} />
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_block)}>
          <div className="field">
            <label className="label is-small">Events per page: </label>
            <FormButtonGroup currentValue={options.limit} values={this.searchLimitOptions} onChange={setLimit} />
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_block)}>
          <div className="field">
            <label className="label is-small">Ticket price range: </label>
            <div className="field-body">
              <FormInput placeholder="Min price" name="price" type="number" size="normal" onChange={setMinPrice} value={options.minPrice} />
              <FormInput placeholder="Max price" name="price" type="number" size="normal" onChange={setMaxPrice} value={options.maxPrice} />
            </div>
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_controls)}>
          <button className="button is-link is-outlined is-fullwidth" type="button" onClick={reset}>
            Reset all filters
          </button>
        </div>
      </nav>
    );
  }
}

EventFilters.wrappedComponent.propTypes = {
  EventStore: PropTypes.object.isRequired,
};

export default EventFilters;
