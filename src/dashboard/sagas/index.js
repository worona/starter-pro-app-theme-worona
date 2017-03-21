import { takeEvery, takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as deps from '../deps';
import wpDataSagas from './wp-data';

export function* saveDefaults(action) {
  yield put(
    deps.actions.saveSettingsRequested(
      { color: '#00AEEA', displayFeaturedImage: true, menu: [] },
      { name: 'starter-pro-app-theme-worona', siteId: action.siteId },
    ),
  );
}

export default function* testSagas() {
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
