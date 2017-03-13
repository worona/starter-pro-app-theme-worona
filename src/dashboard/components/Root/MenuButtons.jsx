import React from 'react';
import Button from '../../elements/Button';

const MenuButtons = () => (
  <div>
    <Button
      outlined
      size="small"
      type="submit"
      style={{ margin: '0 0.3em 1em 0' }}
    >
      All Categories
    </Button>
    <Button
      outlined
      size="small"
      type="submit"
      style={{ margin: '0 0.3em 1em 0.3em' }}
    >
      Hide Categories
    </Button>
    <Button
      outlined
      size="small"
      type="submit"
      style={{ margin: '0 0.3em 1em 0.3em' }}
    >
      All Pages
    </Button>
    <Button
      outlined
      size="small"
      type="submit"
      style={{ margin: '0 0.3em 1em 0.3em' }}
    >
      Hide Pages
    </Button>
  </div>
);

export default MenuButtons;
