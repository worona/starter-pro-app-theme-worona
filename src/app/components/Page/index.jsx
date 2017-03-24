/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import Header from '../Header';
import Title from './Title';
import ContentHtml from './ContentHtml';

const Page = ({ post, color, isReady }) => (
  <div>
    <Header />
    {
      isReady && (
          <section className="section" style={{ paddingTop: '1rem' }}>
            <Title post={post} />
            <ContentHtml html={post.content.rendered} linksColor={color} />
          </section>
        )
    }
  </div>
);

Page.propTypes = {
  isReady: React.PropTypes.bool,
  post: React.PropTypes.shape({
    content: React.PropTypes.shape({ rendered: React.PropTypes.string }),
  }),
  color: React.PropTypes.string,
};

const mapStateToProps = state => ({
  post: deps.selectors.getCurrentSingle(state),
  isReady: deps.selectors.isCurrentSingleReady(state),
  color: deps.selectorCreators.getSetting('theme', 'color')(state),
  siteUrl: deps.selectorCreators.getSetting('generalSite', 'url')(state),
});

export default connect(mapStateToProps)(Page);
