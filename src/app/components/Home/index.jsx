import React from 'react';
import Header from '../Header';
import PostList from './PostList';

const Home = () => (
  <div>
    <Header />
    <PostList />
  </div>
);
Home.propTypes = {
  frontPage: React.PropTypes.shape({
    type: React.PropTypes.string,
    category: React.PropTypes.number,
    page: React.PropTypes.number,
  }),
};

export default Home;
