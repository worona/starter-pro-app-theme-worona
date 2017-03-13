import React from 'react';
import Card from './Card';
import MenuButtons from './MenuButtons';
import Button from '../../elements/Button';

const Menu = () => (
  <div>
    <MenuButtons />
    <Card />
    <Card />
    <Card />
    <div className="has-text-centered">
      <Button outlined style={{ margin: '0 0.3em 1em 0' }}>
        Add More
      </Button>
    </div>
    <div>
      <Button color="primary" size="large" type="submit">
        Save
      </Button>
    </div>
  </div>
);

export default Menu;
