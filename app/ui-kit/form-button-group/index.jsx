import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class FormButtonGroup extends PureComponent {
  onChange = (value) => () => this.props.onChange(value);

  render() {
    return (
      <div className="control">
        <div className="buttons has-addons are-small">
          {this.props.values.map((value) => (
            <span
              key={value}
              className={classNames('button', {
                'is-active': this.props.currentValue === value,
              })}
              onClick={this.onChange(value)}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

FormButtonGroup.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormButtonGroup;
