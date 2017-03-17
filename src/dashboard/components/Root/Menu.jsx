import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer as sortableContainer, arrayMove } from 'react-sortable-hoc';
import Card from './Card';
import * as actions from '../../actions';
import * as deps from '../../deps';

const SortableList = sortableContainer(({ items }) => (
  <span>
    {items.map(({ url, label }, index) => (
      <Card
        key={`item-${index}`}
        url={url}
        label={label}
        index={index}
        style={{ marginBottom: '1em' }}
      />
    ))}
  </span>
));

class SortableComponentClass extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        { label: 'Category 1', url: 'https://demo.worona.org/wp-cat/cities/architecture/' },
        { label: 'Contact', url: 'https://demo.worona.org/contact' },
        { label: 'Legal', url: 'https://demo.worona.org/legal' },
        { label: 'Category 2', url: 'https://demo.worona.org/wp-cat/cities/architecture/' },
      ],
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.props.onSortEnd({ oldIndex, newIndex });
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }

  render() {
    return (
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        onSortStart={this.props.onSortStart}
        useDragHandle
      />
    );
  }
}
SortableComponentClass.propTypes = {
  onSortStart: React.PropTypes.func.isRequired,
  onSortEnd: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSortStart({ index }) {
    dispatch(actions.menuItemSortStarted({ index }));
  },
  onSortEnd({ oldIndex, newIndex }) {
    dispatch(actions.menuItemSortEnded({ oldIndex, newIndex }));
  },
});

const SortableComponent = connect(null, mapDispatchToProps)(SortableComponentClass);

const Menu = ({ label }) => (
  <div>
    <span className="label">{label}</span>
    <SortableComponent />
    <br />
    <deps.elements.Button outlined style={{ margin: '0 0.3em 1em 0' }}>
      Add menu element
    </deps.elements.Button>
  </div>
);
Menu.propTypes = {
  label: React.PropTypes.string.isRequired,
};

export default Menu;
