import React from 'react';
import Button from '../../elements/Button';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const DragHandle = SortableHandle(({ label }) =>
  <p className="card-header-title">
    <i className="fa fa-ellipsis-v" aria-hidden="true" style={{ color: '#b5b5b5', marginRight: '0.4em' }} />
    {label}
  </p>
);

const Card = SortableElement(({ label, url, isOpen = false }) => (
  <div className="card">
    <header className="card-header">
      <DragHandle label={label} />
      <a className="card-header-icon">
        <span className="icon">
          { isOpen ? <i className="fa fa-angle-up" /> : <i className="fa fa-angle-down" /> }
        </span>
      </a>
    </header>
    { isOpen ?
      <div className="card-content">
        <span>URL</span>
        <p className="control">
          <input className="input" type="text" value={url} />
        </p>
        <span>Label</span>
        <p className="control">
          <input className="input" type="text" value={label} />
        </p>
        <p>
          <Button link color="danger" size="small" type="submit" style={{ color: 'red', paddingLeft: '0px' }}>
            Delete
          </Button>
          |
          <Button link color="danger" size="small" type="submit" >
            Cancel
          </Button>
        </p>
      </div>
      :
      null
    }
  </div>
));

Card.propTypes = {
  url: React.PropTypes.string,
  label: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
};

export default Card;
