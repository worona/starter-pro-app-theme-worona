/* eslint-disable global-require, import/no-dynamic-require */
import './style.sass';
import * as reducers from './reducers';
import * as components from './components';
import * as actions from './actions';
import * as types from './types';
import * as sagas from './sagas';
import * as deps from './deps';

const locales = lang => require(`./locales/${lang}.json`);

export {
  reducers,
  components,
  deps,
  locales,
  types,
  actions,
  sagas,
};
