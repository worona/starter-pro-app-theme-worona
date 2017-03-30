/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { toggleMobileMenu, closeMobileMenu } from '../../actions';
import { Menu } from './Menu';
import Cover from './Cover';
import styles from './style.css';
import * as deps from '../../deps';
import * as libs from '../../libs';

const TopNav = ({ color, items, active, toggle, close, title }) => {
  let navigationMenu = null;
  if (items.length > 0) {
    navigationMenu = (
      <div>
        <span
          className={`nav-toggle is-right ${styles.navigationMenu} ${active ? 'is-active' : ''}`}
          onClick={toggle}
          style={{ display: 'block' }}
        >
          <span style={{ backgroundColor: libs.blackOrWhite(color) }} />
          <span style={{ backgroundColor: libs.blackOrWhite(color) }} />
          <span style={{ backgroundColor: libs.blackOrWhite(color) }} />
        </span>
        <Cover hide={!active} onClick={close} />
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 150 }}
          leave={{ animation: 'slideUp', duration: 150 }}
        >
          {active ? <Menu items={items} active={active} color={color} /> : null}
        </VelocityTransitionGroup>
      </div>
    );
  }
  return (
    <div className="hero-head" style={{ backgroundColor: color, color: libs.blackOrWhite(color) }}>
      <nav className="nav">
        <div className="nav-left">
          <span className="nav-item">
            {title}
          </span>
        </div>
        {navigationMenu}
      </nav>
    </div>
  );
};

TopNav.propTypes = {
  color: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  color: deps.selectorCreators.getSetting('theme', 'color')(state),
  items: deps.selectorCreators.getSetting('theme', 'menu')(state),
  active: state.theme.showingMobileMenu,
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleMobileMenu()),
  close: () => dispatch(closeMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
