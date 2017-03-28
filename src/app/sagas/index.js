import { takeEvery } from 'redux-saga';
import { fork, call, select } from 'redux-saga/effects';
import * as deps from '../deps';

function* redirectHome() {
  const contentType = yield select(deps.selectors.getContentType);
  if (contentType === 'Home') {
    const { type, category, page } = yield select(
      deps.selectorCreators.getSetting('theme', 'frontPage'),
    );
    if (type === 'category') {
      yield call(deps.libs.push, `?cat=${category}`);
    } else if (type === 'page') {
      yield call(deps.libs.push, `?page_id=${page}`);
    }
  }
}

export default function* starterProSagas() {
  yield [
    fork(redirectHome),
    takeEvery(deps.types.ROUTER_DID_CHANGE, redirectHome),
  ];
}
