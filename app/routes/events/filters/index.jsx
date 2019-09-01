import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.m.scss';
import FormButtonGroup from '../../../ui-kit/form-button-group';
import FormInput from '../../../ui-kit/form-input';

class EventFilters extends Component {
  // export to constants
  searchLimitOptions = [5, 10, 25, 50];

  render() {
    const {
      filters,
      onChangeLimit,
      onChangeSearchQuery,
      onChangeMinPrice,
      onChangeMaxPrice,
      onReset,
    } = this.props;
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
            <FormInput placeholder="Search event" name="search" type="text" size="normal" onChange={onChangeSearchQuery} value={filters.searchQuery} />
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_block)}>
          <div className="field">
            <span className="label is-small" >Events per page: </span>
            <FormButtonGroup currentValue={filters.limit} values={this.searchLimitOptions} onChange={onChangeLimit} />
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_block)}>
          <div className="field">
            <label className="label is-small">Ticket price range: </label>
            <div className="field-body">
              <FormInput placeholder="Min price" name="price" type="number" min="0" size="normal" onChange={onChangeMinPrice} value={filters.minPrice} />
              <FormInput placeholder="Max price" name="price" type="number" min="0" size="normal" onChange={onChangeMaxPrice} value={filters.maxPrice} />
            </div>
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_controls)}>
          <button className="button is-link is-outlined is-fullwidth" type="button" onClick={onReset}>
            Reset all filters
          </button>
        </div>
      </nav>
    );
  }
}

EventFilters.propTypes = {
  filters: PropTypes.shape({
    searchQuery: PropTypes.string,
    minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    limit: PropTypes.number,
  }).isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  onChangeSearchQuery: PropTypes.func.isRequired,
  onChangeMinPrice: PropTypes.func.isRequired,
  onChangeMaxPrice: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default EventFilters;
