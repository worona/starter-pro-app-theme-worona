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

function hideIosStatusBar() {
  console.log(isIos);
  debugger;
  if (isIos && StatusBar) {
    StatusBar.hide();
    console.log('hiden!');
  }
}

export default function* starterProSagas() {
  yield [
    fork(redirectHome),
    fork(hideIosStatusBar),
  ];
}
