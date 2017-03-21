import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import * as selectors from '../../selectors';
import * as deps from '../../deps';

const FrontPage = ({ label, type, categories, pages }) => (
  <div>
    <span className="label">{label}</span>
    <Field
      name="frontPage.type"
      label="Type"
      component={deps.elements.Select}
      size="small"
      options={['Latest posts', 'Category', 'Page']}
    />
    {type === 'Category' && (
      <Field
        name="frontPage.category"
        label="Category"
        component={deps.elements.Select}
        size="small"
        options={categories.map(item => item.name)}
      />
    )}
    {type === 'Page' && (
      <Field
        name="frontPage.page"
        label="Page"
        component={deps.elements.Select}
        size="small"
        options={pages.map(item => item.title.rendered)}
      />
    )}
  </div>
);
FrontPage.propTypes = {
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
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
