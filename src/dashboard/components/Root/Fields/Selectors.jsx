import React from 'react';
import { find } from 'lodash';
import { Field } from 'redux-form';
import * as deps from '../../../deps';

export const CategorySelector = ({ name, label, categories }) => (
  <Field
    name={name}
    label={label}
    component={deps.elements.Select}
    size="small"
    options={categories.map(item => item.name)}
    parse={key => find(categories, category => category.name === key).id}
    format={id => {
      const category = find(categories, item => item.id === id);
      return category ? category.name : '';
    }}
  />
);
CategorySelector.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  categories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export const PagesSelector = ({ name, label, pages }) => (
  <Field
    name={name}
    label={label}
    component={deps.elements.Select}
    size="small"
    options={pages.map(item => item.title.rendered)}
    parse={title => find(pages, page => page.title.rendered === title).id}
    format={id => {
      const page = find(pages, item => item.id === id);
      return page ? page.title.rendered : '';
    }}
  />
);
PagesSelector.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  pages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
