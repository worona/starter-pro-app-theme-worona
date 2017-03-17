/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import {
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
} from 'react-sortable-hoc';
import { Field, formValueSelector } from 'redux-form';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

const DragHandle = sortableHandle(({ label }) => (
  <p style={{ cursor: 'move' }}>
    <i
      className="fa fa-bars"
      aria-hidden="true"
      style={{ color: '#dbdbdb', marginRight: '0.4em' }}
    />
    {label}
  </p>
));

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <span className="label">{label}</span>
    <p className="control">
      <input {...input} type={type} placeholder={label} className="input" />
      {touched && error && <span className="is-danger">{error}</span>}
    </p>
  </div>
);
renderField.propTypes = {
  input: React.PropTypes.shape({}).isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string,
  }).isRequired,
};

const Card = sortableElement(({
  member,
  isOpen = false,
  openMenuItem,
  closeMenuItem,
  label,
  remove,
}) => (
  <div className="card">
    <header className="card-header">
      <div className="card-header-title">
        <DragHandle label={label} />
      </div>
      <a className="card-header-icon" onClick={isOpen ? closeMenuItem : openMenuItem}>
        <span className="icon">
          {isOpen ? <i className="fa fa-angle-up" /> : <i className="fa fa-angle-down" />}
        </span>
      </a>
    </header>
    {isOpen
      ? <div className="card-content">
          <Field name={`${member}.label`} component={renderField} type="text" label="Label" />
          <Field
            name={`${member}.type`}
            label="Type"
            component={deps.elements.Select}
            size="small"
            options={['Category', 'Page', 'Link']}
          />
          <br />
          <p>
            <deps.elements.Button
              onClick={remove}
              color="danger"
              size="small"
              outlined
            >
              Delete
            </deps.elements.Button>
            {' '}
            <deps.elements.Button onClick={closeMenuItem} color="primary" size="small" outlined>
              Close
            </deps.elements.Button>
          </p>
        </div>
      : null}
  </div>
));

Card.propTypes = {
  fields: React.PropTypes.shape({}).isRequired,
  index: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  isOpen: React.PropTypes.bool,
};

const mapStateToProps = (state, { index, member }) => {
  const reduxFormSelector = formValueSelector('StarterProThemeForm', st => st.theme.reduxForm);
  return {
    isOpen: selectors.getMenuItemOpen(state) === index,
    label: reduxFormSelector(state, `${member}.label`),
  };
};

const mapDispatchToProps = (dispatch, { index }) => ({
  openMenuItem() {
    dispatch(actions.menuItemOpened({ index }));
  },
  closeMenuItem() {
    dispatch(actions.menuItemClosed({ index }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
