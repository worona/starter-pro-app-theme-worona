import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import Card from './Card';
import Button from '../../elements/Button';

const SortableList = SortableContainer(() => (
  <span>
    <Card url="https://demo.worona.org/wp-cat/cities/architecture/" label="Category 1" />
    <br />
    <Card url="https://demo.worona.org/contact" label="Contact" />
    <br />
    <Card url="https://demo.worona.org/legal" label="Legal" />
    <br />
  </span>
));

class SortableComponent extends Component {
  render() {
    return (
        <SortableList onSortEnd={this.onSortEnd} useDragHandle />
    )
  }
}

const Menu = () => (
  <div>
    <SortableComponent />
    <Button outlined style={{ margin: '0 0.3em 1em 0' }}>
      Add More
    </Button>
    <div>
      <Button color="primary" size="large" type="submit">
        Save
      </Button>
    </div>
  </div>
);

export default Menu;
