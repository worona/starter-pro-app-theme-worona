import React from 'react';
import MenuItem from './MenuItem';
import styles from './style.css';

export const Menu = ({ items, active, color }) => (
  <div
    className={`nav-right nav-menu ${styles.navigationMenu} ${active ? 'is-active' : ''}`}
    style={{ backgroundColor: color }}
  >
    {items.map((item, index) => (
      <MenuItem key={index} tabindex={index + 2} color={color} {...item} />
    ))}
  </div>
);
Menu.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool,
  color: React.PropTypes.string,
};

export default Menu;
