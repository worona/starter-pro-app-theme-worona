import { takeEvery, takeLatest } from 'redux-saga';
import { put, take, select } from 'redux-saga/effects';
import * as deps from '../deps';
import * as types from '../types';
import * as selectors from '../selectors';
import wpDataSagas from './wp-data';

export function* saveDefaults(action) {
  yield [take(types.CATEGORIES_LIST_SUCCEED), take(types.PAGES_LIST_SUCCEED)];
  const categories = yield select(selectors.getCategoriesList);
  const pages = yield select(selectors.getPagesList);
  yield put(
    deps.actions.saveSettingsRequested(
      {
        color: '#00AEEA',
        displayFeaturedImage: true,
        menu: [
          {
            type: 'blog_home',
            label: 'Home',
            category: categories[0] && categories[0].id || 0,
            page: pages[0] && pages[0].id || 0,
          },
        ],
        frontPage: {
          type: 'blog_home',
          category: categories[0] && categories[0].id || 0,
          page: pages[0] && pages[0].id || 0,
        },
      },
      { name: 'starter-pro-app-theme-worona', siteId: action.siteId },
    ),
  );
}

export default function* starterProThemeSagas() {
  yield [
    takeEvery(
      action =>
        action.type === deps.types.DEFAULT_SETTINGS_NEEDED &&
        action.name === 'starter-pro-app-theme-worona',
      saveDefaults,
    ),
    takeLatest(deps.types.SITE_SELECTED, wpDataSagas),
  ];
}
