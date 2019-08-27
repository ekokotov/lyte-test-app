import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FormInput extends PureComponent {
  onInputHandler = (e) => this.props.onChange(e.target.value); // debounce((text) => this.props.onChange(text, this.props.debounce);

  render() {
    const hasErrors = this.props.errors && this.props.errors.length;

    return (
      <div className="field">
        {this.props.label && <label className="label is-small" htmlFor={this.props.name}>{this.props.label}</label>}
        <div className="control">
          <input
            ref={this.props.innerRef}
            className={classNames('input', `is-${this.props.size}`, {
              'is-danger': hasErrors,
            })}
            name={this.props.name}
            id={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            required={this.props.required}
            value={this.props.value}
            onChange={this.props.onChange ? this.onInputHandler : null}
          />
        </div>
        {!!hasErrors && this.props.errors.map((error) => <p key={error} className="help is-danger">{error}</p>)}
      </div>
    );
  }
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  size: PropTypes.oneOf(['large', 'small', 'medium', 'normal']),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

FormInput.defaultProps = {
  required: false,
  errors: [],
  size: 'large',
};

export default React.forwardRef((props, ref) => <FormInput innerRef={ref} {...props} />);
