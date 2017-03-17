/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import {
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
} from 'react-sortable-hoc';
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

const Card = sortableElement(({ label, url, isOpen = false, openMenuItem, closeMenuItem }) => (
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
          <span>URL</span>
          <p className="control">
            <input className="input" type="text" value={url} />
          </p>
          <span>Label</span>
          <p className="control">
            <input className="input" type="text" value={label} />
          </p>
          <p>
            <deps.elements.Button
              link
              color="danger"
              size="small"
              type="submit"
              style={{ color: 'red', paddingLeft: '0px' }}
            >
              Delete
            </deps.elements.Button>
            |
            <deps.elements.Button link color="danger" size="small" type="submit">
              Cancel
            </deps.elements.Button>
          </p>
        </div>
      : null}
  </div>
));

Card.propTypes = {
  index: React.PropTypes.number.isRequired,
  url: React.PropTypes.string,
  id: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  isOpen: React.PropTypes.bool,
};

const mapStateToProps = (state, { index }) => ({
  isOpen: selectors.getMenuItemOpen(state) === index,
});

const mapDispatchToProps = (dispatch, { index }) => ({
  openMenuItem() { dispatch(actions.menuItemOpened({ index })) },
  closeMenuItem() { dispatch(actions.menuItemClosed({ index })) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
