import React from 'react';
import { Link } from 'react-router';
import * as libs from '../../libs';

const MenuItem = ({ label, type, url, page, category, color }) => {
  let link = '';
  if (type === 'page') link = `?page_id=${page}`;
  else if (type === 'category') link = `?cat=${category}`;
  return (
    <span className="nav-item">
      {type === 'link' ?
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: libs.blackOrWhite(color) }}
        >
          {label}
        </a> :
        <Link
          activeClassName="is-active"
          to={link}
          style={{ color: libs.blackOrWhite(color) }}
        >
          {label}
        </Link>
      }
    </span>
  );
};
MenuItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  page: React.PropTypes.number,
  category: React.PropTypes.number,
  url: React.PropTypes.string,
  color: React.PropTypes.string,
};

export default MenuItem;
