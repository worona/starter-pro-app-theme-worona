/* eslint-disable react/no-danger */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { flow } from 'lodash/fp';
import * as libs from '../../libs';
import * as deps from '../../deps';

const Title = ({ post, categories, users, color, displayCategories, t }) => (
  <div className="content is-medium">
    <h1><div dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></h1>
    <h6>
      {users[post.author] &&
        <span>
          {t('By')}{' '}<span style={{ fontWeight: 600 }}>{users[post.author].name}</span>
        </span>}
      {displayCategories && post.categories.map(category => (
          <span key={category}>
            <Link
              style={{ color: libs.darkenColor(color) }}
              to={`?cat=${categories[category].id}`}
            >
              #{categories[category].name}
            </Link>
            {' '}
          </span>
        ))}
    </h6>
  </div>
);

Title.propTypes = {
  post: React.PropTypes.shape({}),
  categories: React.PropTypes.shape({}),
  users: React.PropTypes.shape({}),
  color: React.PropTypes.string,
  displayCategories: React.PropTypes.bool,
  t: React.PropTypes.func.isRequired,
};

const mapStateToTitleProps = state => ({
  users: deps.selectors.getUsersEntities(state),
  categories: deps.selectors.getCategoriesEntities(state),
  color: deps.selectorCreators.getSetting('theme', 'color')(state),
  displayCategories: deps.selectorCreators.getSetting('theme', 'displayCategories')(state),
});

export default flow(connect(mapStateToTitleProps), translate('theme'))(Title);
