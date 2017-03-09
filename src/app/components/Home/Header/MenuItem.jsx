import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import Icon from './Icon';

export const ExtLink = props => (
  <a {...props}>
    {props.children}
  </a>
);
ExtLink.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export const InnerLink = props => (
  <Link {...props} activeClassName="is-active">
    {props.children}
  </Link>
);
InnerLink.propTypes = {
  children: React.PropTypes.node.isRequired,
};

const MenuItem = ({ type, name, url, target, link, action, icon, tabindex }) => {
  const Anchor = !link ? ExtLink : InnerLink;
  const anchorClass = cn({
    'button is-primary': type === 'button',
  });
  return (
    <span className="nav-item">
      <Anchor
        className={anchorClass}
        href={url} to={link} target={target} onClick={action}
        role="button" tabIndex={tabindex}
      >
        {type === 'button' && icon ? (
          <Icon code={icon} small />
        ) : null}
        <span>{name}</span>
      </Anchor>
    </span>
  );
};
MenuItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string,
  link: React.PropTypes.string,
  action: React.PropTypes.func,
  target: React.PropTypes.string,
  icon: React.PropTypes.string,
  tabindex: React.PropTypes.number,
};

export default MenuItem;
