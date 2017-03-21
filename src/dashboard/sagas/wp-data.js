import { select, put, fork } from 'redux-saga/effects';
import Wpapi from 'wpapi';
import * as actions from '../actions';
import * as deps from '../deps';

export const getCategories = connection =>
  function* getCategoriesSaga() {
    try {
      yield put(actions.categoriesListRequested());
      const categories = yield connection.categories().perPage(100);
      yield put(actions.categoriesListSucceed({ categories }));
    } catch (error) {
      yield put(actions.categoriesListFailed({ error }));
    }
  };

export const getPages = connection =>
  function* getCategoriesSaga() {
    try {
      yield put(actions.pagesListRequested());
      const pages = yield connection.pages().perPage(100);
      yield put(actions.pagesListSucceed({ pages }));
    } catch (error) {
      yield put(actions.pagesListFailed({ error }));
    }
  };

export default function* wpDataSagas() {
  const { url } = yield select(deps.selectors.getSelectedSite);
  const connection = new Wpapi({ endpoint: `https://cors.worona.io/${url}?rest_route=` });
  yield [fork(getCategories(connection)), fork(getPages(connection))];
}
