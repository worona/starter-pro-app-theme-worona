import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import LoadMore from './LoadMore';
import * as deps from '../../../deps'; // eslint-disable-line
import styles from './style.css';

const PostList = ({ posts, result, isReady, authors, featuredMedias, displayFeaturedImage,
  categories }) => (
    <div className={styles.postList}>
      <div className="columns is-multiline">
        {isReady && result.map(id => (
          <div key={id} className="column is-one-quarter">
            <PostItem
              post={posts[id]}
              author={authors[posts[id].author]}
              featuredMedia={featuredMedias[posts[id].featured_media]}
              displayFeaturedImage={displayFeaturedImage}
              categories={posts[id].categories.map(catId => categories[catId])}
            />
          </div>
        ))}
        <div className="column is-one-quarter has-text-centered">
          <LoadMore />
        </div>
      </div>
    </div>
);

PostList.propTypes = {
  posts: React.PropTypes.shape({}),
  result: React.PropTypes.arrayOf(React.PropTypes.number),
  isReady: React.PropTypes.bool,
  authors: React.PropTypes.shape({}),
  featuredMedias: React.PropTypes.shape({}),
  categories: React.PropTypes.arrayOf(React.PropTypes.number),
  displayFeaturedImage: React.PropTypes.bool,
};

const mapStateToProps = state => ({ // eslint-disable-line
  posts: deps.selectors.getPostsById(state),
  result: deps.selectors.getPostsResult(state),
  isReady: deps.selectors.isPostsReady(state),
  authors: deps.selectors.getAuthorsById(state),
  featuredMedias: deps.selectors.getFeaturedMediasById(state),
  categories: deps.selectors.getCategoriesById(state),
  displayFeaturedImage: deps.selectorCreators.getSetting('theme', 'displayFeaturedImage')(state),
});

export default connect(mapStateToProps)(PostList);
