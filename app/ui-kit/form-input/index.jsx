import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

class FormInput extends PureComponent {
  onInputHandler = debounce((text) => this.props.onChange(text.trim()), this.props.debounce);

  render() {
    const hasErrors = this.props.errors && this.props.errors.length;

    return (
      <div className="field">
        {this.props.label && <label className="label" htmlFor={this.props.name}>{this.props.label}</label>}
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
            onChange={(e) => this.onInputHandler(e.target.value)}
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
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  size: PropTypes.oneOf(['large', 'small', 'medium', 'normal']),
  onChange: PropTypes.func,
  debounce: PropTypes.number,
};

FormInput.defaultProps = {
  required: true,
  errors: [],
  size: 'large',
  debounce: 350,
};

export default React.forwardRef((props, ref) => <FormInput innerRef={ref} {...props} />);

// export default FormInput;
