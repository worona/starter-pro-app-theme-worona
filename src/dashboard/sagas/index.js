import { takeEvery, takeLatest } from 'redux-saga';
import { put, take, select, fork } from 'redux-saga/effects';
import * as deps from '../deps';
import * as types from '../types';
import * as selectorCreators from '../selectorCreators';
import wpDataSagas from './wp-data';

export function* saveDefaults(action) {
  yield [
    ({ type, siteId }) => type === take(types.CATEGORIES_LIST_SUCCEED) && siteId === action.siteId,
    ({ type, siteId }) => type === take(types.PAGES_LIST_SUCCEED) && siteId === action.siteId,
  ];
  const categories = yield select(selectorCreators.getCategoriesList(action.siteId));
  const pages = yield select(selectorCreators.getPagesList(action.siteId));
  yield put(
    deps.actions.saveSettingsRequested(
      {
        color: '#00AEEA',
        displayFeaturedImage: true,
        menu: [
          {
            type: 'blog_home',
            label: 'Home',
            category: (categories[0] && categories[0].id) || 0,
            page: (pages[0] && pages[0].id) || 0,
          },
        ],
        frontPage: {
          type: 'blog_home',
          category: (categories[0] && categories[0].id) || 0,
          page: (pages[0] && pages[0].id) || 0,
        },
      },
      { name: 'starter-pro-app-theme-worona', siteId: action.siteId },
    ),
  );
}

export default function* starterProThemeSagas() {
  const siteId = yield select(deps.selectors.getSelectedSiteId);
  if (siteId) yield fork(wpDataSagas, { siteId });
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
