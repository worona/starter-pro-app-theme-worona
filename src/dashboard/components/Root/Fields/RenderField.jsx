import React from 'react';

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <span className="label">{label}</span>
    <p className="control">
      <input {...input} type={type} placeholder={label} className="input" />
      {touched && error && <span className="is-danger">{error}</span>}
    </p>
  </div>
);
RenderField.propTypes = {
  input: React.PropTypes.shape({}).isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string,
  }).isRequired,
};

export default RenderField;
