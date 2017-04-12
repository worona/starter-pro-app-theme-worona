import React from 'react';
import { Field } from 'redux-form';
import { findKey } from 'lodash';
import * as deps from '../../../deps';

const languages = {
  en: 'English',
  es: 'Spanish',
};

const Language = () => (
  <Field
    name="language"
    component={deps.elements.Select}
    label="Language"
    options={Object.values(languages)}
    parse={value => findKey(languages, item => item === value)}
    format={key => languages[key]}
  />
);

export default Language;
