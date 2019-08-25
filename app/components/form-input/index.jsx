import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FormInput extends PureComponent {
  render() {
    const hasErrors = this.props.errors && this.props.errors.length;

    return (
      <div className="field">
        <label className="label" htmlFor={this.props.name}>{this.props.label}</label>
        <div className="control">
          <input
            ref={this.props.innerRef}
            className={classNames('input', 'is-large', {
              'is-danger': hasErrors,
            })}
            name={this.props.name}
            id={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            required={this.props.required}
            // defaultValue="qusecr@example.com"
          />
        </div>
        {!!hasErrors && this.props.errors.map((error) => <p key={error} className="help is-danger">{error}</p>)}
      </div>
    );
  }
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

FormInput.defaultProps = {
  required: true,
  errors: [],
};

export default React.forwardRef((props, ref) => <FormInput innerRef={ref} {...props} />);

// export default FormInput;
