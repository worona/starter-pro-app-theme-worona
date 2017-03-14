import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import Card from './Card';
import Button from '../../elements/Button';

const SortableList = SortableContainer(({items}) => (
  <span>
    {items.map((url, label, index) =>
                <Card key={`item-${index}`}  url={url} label={label} style={{ marginBottom: '1em' }} />
            )}
  </span>
));

class SortableComponent extends Component {
  state =
  {
    items: [{label: 'Category 1', url: 'https://demo.worona.org/wp-cat/cities/architecture/'},
    {label: 'Contact', url: 'https://demo.worona.org/contact'},
    {label: 'Legal', url: 'https://demo.worona.org/legal'},
    {label: 'Category 1', url: 'https://demo.worona.org/wp-cat/cities/architecture/'}]
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    let {items} = this.state;

    this.setState({
        items: arrayMove(items, oldIndex, newIndex)
    });
  };
  render() {
    return (
        <SortableList items={items} onSortEnd={this.onSortEnd} onSortEnd={this.onSortEnd} useDragHandle />
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
