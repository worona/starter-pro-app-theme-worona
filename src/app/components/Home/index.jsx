import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import PostList from './PostList';
import * as deps from '../../deps';

const Home = ({ frontPage: { type, category, page } }) => (
  <div>
    <Header />
    {(type === 'blog_home' || type === 'category') && <PostList />}
  </div>
);
Home.propTypes = {
  frontPage: React.PropTypes.shape({
    type: React.PropTypes.string,
    category: React.PropTypes.number,
    page: React.PropTypes.number,
  }),
};

const map = state => ({
  frontPage: deps.selectorCreators.getSetting('theme', 'frontPage')(state),
})

export default connect(map)(Home);
