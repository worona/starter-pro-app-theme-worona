/* eslint-disable no-undef */
import { fork, call, select } from 'redux-saga/effects';
import { isIos } from 'worona-deps';
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

function* colorStatusBar() {
  const contentType = yield select(deps.selectors.getContentType);
  const color = yield select(deps.selectorCreators.getSetting('theme', 'color'));
  if (contentType === 'Post') {
    // White background and dark text.
    StatusBar.backgroundColorByHexString('#FFF');
    StatusBar.styleDefault();
  } else {
    // background of same color than app and text depending on blackOrWhite color.
    StatusBar.backgroundColorByHexString(color);
    if (blackOrWhite(color) === '#FFF') StatusBar.styleLightContent();
    else StatusBar.styleDefault();
  }
}

function* colorStatusBarWatcher() {
  if (isIos && StatusBar) {
    StatusBar.overlaysWebView(false);
    yield fork(colorStatusBar);
    yield takeEvery(deps.types.ROUTER_DID_CHANGE, colorStatusBar);
  }
}

export default function* starterProSagas() {
  yield [
    fork(colorStatusBarWatcher),
    fork(redirectHome),
  ];
}
