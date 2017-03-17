import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as deps from '../deps';

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
  ];
}
