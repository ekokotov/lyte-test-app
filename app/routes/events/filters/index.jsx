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
  search = React.createRef();

  resetFilters = () => {
    this.search.current.value = '';
    this.props.EventStore.reset();
  };

  render() {
    const {
      options,
      setLimit,
      setSearchQuery,
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
            <FormInput required={false} placeholder="Search event" name="search" type="text" size="normal" onChange={setSearchQuery} innerRef={this.search} />
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_block)}>
          <div className="field">
            <label className="label is-small">Per page: </label>
            <FormButtonGroup currentValue={options.limit} values={[5, 10, 25, 50]} onChange={setLimit} />
          </div>
        </div>
        <div className={classNames('panel-block', styles.panel_controls)}>
          <button className="button is-link is-outlined is-fullwidth" type="button" onClick={this.resetFilters}>
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
