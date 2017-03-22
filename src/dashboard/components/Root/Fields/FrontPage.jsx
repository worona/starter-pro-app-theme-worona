import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import * as selectors from '../../../selectors';
import Type from './Type';
import { CategorySelector, PagesSelector } from './Selectors';

const FrontPage = ({ label, type, categories, pages }) => (
  <div>
    <span className="label">{label}</span>
    <Type name="frontPage.type" options={['Latest posts', 'Category', 'Page']} pages={pages} />
    {type === 'category' &&
      <CategorySelector name="frontPage.category" label="Category" categories={categories} />
    }
    {type === 'page' &&
      <PagesSelector name="frontPage.page" label="Page" pages={pages} />
    }
  </div>
);
FrontPage.propTypes = {
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
  pages: React.PropTypes.arrayOf(React.PropTypes.object),
};

const reduxFormSelector = formValueSelector('StarterProThemeForm', st => st.theme.reduxForm);
const mapStateToProps = state => ({
  type: reduxFormSelector(state, 'frontPage.type'),
  categories: selectors.getCategoriesList(state),
  pages: selectors.getPagesList(state),
});

export default connect(mapStateToProps)(FrontPage);
