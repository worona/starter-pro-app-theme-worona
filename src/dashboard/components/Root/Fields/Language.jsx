import React from 'react';
import { Field } from 'redux-form';
import { findKey } from 'lodash';
import * as deps from '../../../deps';

const languages = {
  en: 'English',
  es: 'Spanish',
  ar: 'Arabic',
};

const Language = () => (
  <div>
    <Field
      name="language"
      component={deps.elements.Select}
      label="Language"
      options={Object.values(languages)}
      parse={value => findKey(languages, item => item === value)}
      format={key => languages[key]}
    />
    <span className="help">
      -&gt; Want to add new language?
      {' '}
      <a href="https://www.worona.org/get-help" target="_blank" rel="noopener noreferrer">
        Let us know!
      </a>
    </span>
  </div>
);

export default Language;
