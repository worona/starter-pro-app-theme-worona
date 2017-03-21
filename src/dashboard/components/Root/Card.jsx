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
import RenderField from './RenderField';

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

const Card = sortableElement(({
  member,
  isOpen = false,
  openMenuItem,
  closeMenuItem,
  label,
  type,
  remove,
  categories,
  pages,
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
          <Field name={`${member}.label`} component={RenderField} type="text" label="Label" />
          <Field
            name={`${member}.type`}
            label="Type"
            component={deps.elements.Select}
            size="small"
            options={['Latest posts', 'Category', 'Page', 'Link']}
          />
        {type === 'Category' && (
          <Field
            name={`${member}.category`}
            label="Category"
            component={deps.elements.Select}
            size="small"
            options={categories.map(item => item.name)}
          />
        )}
        {type === 'Page' && (
          <Field
            name={`${member}.page`}
            label="Page"
            component={deps.elements.Select}
            size="small"
            options={pages.map(item => item.title.rendered)}
          />
        )}
        {type === 'Link' && (
          <Field name={`${member}.url`} component={RenderField} type="text" label="URL" />
        )}
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
  fields: React.PropTypes.shape({}),
  index: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  isOpen: React.PropTypes.bool,
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
  pages: React.PropTypes.arrayOf(React.PropTypes.object),
};

const reduxFormSelector = formValueSelector('StarterProThemeForm', st => st.theme.reduxForm);
const mapStateToProps = (state, { index, member }) => ({
  isOpen: selectors.getMenuItemOpen(state) === index,
  label: reduxFormSelector(state, `${member}.label`),
  type: reduxFormSelector(state, `${member}.type`),
  categories: selectors.getCategoriesList(state),
  pages: selectors.getPagesList(state),
});
const mapDispatchToProps = (dispatch, { index }) => ({
  openMenuItem() {
    dispatch(actions.menuItemOpened({ index }));
  },
  closeMenuItem() {
    dispatch(actions.menuItemClosed({ index }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
