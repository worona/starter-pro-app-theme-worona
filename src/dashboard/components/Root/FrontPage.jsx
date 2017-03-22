import React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
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
      options={['Latest posts', 'Category', 'Page'].filter(
        item => item !== 'Page' || pages.length > 0,
      )}
    />
    {type === 'Category' &&
      <Field
        name="frontPage.category"
        label="Category"
        component={deps.elements.Select}
        size="small"
        options={categories.map(item => item.name)}
        parse={name => find(categories, category => category.name === name).id}
        format={id => {
          const category = find(categories, item => item.id === id);
          return category ? category.name : '';
        }}
      />
    }
    {type === 'Page' &&
      <Field
        name="frontPage.page"
        label="Page"
        component={deps.elements.Select}
        size="small"
        options={pages.map(item => item.title.rendered)}
        parse={title => find(pages, page => page.title.rendered === title).id}
        format={id => {
          const page = find(pages, item => item.id === id);
          return page ? page.title.rendered : '';
        }}
      />
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
