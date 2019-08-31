import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

class FormInput extends PureComponent {
  onInputHandler = (e) => this.props.onChange(e.target.value); // debounce((text) => this.props.onChange(text, this.props.debounce);

  render() {
    const hasErrors = this.props.errors && this.props.errors.length;
    const inputProps = omit(this.props, ['innerRef', 'errors', 'horizontal']);

    return (
      <>
        {this.props.label && this.props.horizontal && (
        <div className="field-label is-normal">
          <label className="label" htmlFor={this.props.name}>{this.props.label}</label>
        </div>
        )}
        <div className="field">
          {this.props.label && !this.props.horizontal && <label className="label" htmlFor={this.props.name}>{this.props.label}</label>}
          <div className="control">
            <input
              {...inputProps}
              ref={this.props.innerRef}
              className={classNames('input', `is-${this.props.size}`, {
                'is-danger': hasErrors,
              })}
              id={this.props.name}
              onChange={this.props.onChange ? this.onInputHandler : null}
            />
          </div>
          {!!hasErrors && this.props.errors.map((error) => <p key={error} className="help is-danger">{error}</p>)}
        </div>
      </>
    );
  }
}

FormInput.propTypes = {
  horizontal: PropTypes.bool,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
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
  errors: [],
  size: 'large',
  horizontal: false,
};

export default React.forwardRef((props, ref) => <FormInput innerRef={ref} {...props} />);
