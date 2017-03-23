import { takeEvery } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import Wpapi from 'wpapi';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../deps';

export const getCategories = ({ connection }) =>
  function* getCategoriesSaga({ siteId }) {
    try {
      const categories = yield connection.categories().perPage(100);
      yield put(actions.categoriesListSucceed({ categories, siteId }));
    } catch (error) {
      yield put(actions.categoriesListFailed({ error, siteId }));
    }
  };

export const getPages = ({ connection }) =>
  function* getCategoriesSaga({ siteId }) {
    try {
      const pages = yield connection.pages().perPage(100);
      yield put(actions.pagesListSucceed({ pages, siteId }));
    } catch (error) {
      yield put(actions.pagesListFailed({ error, siteId }));
    }
  };

export default function* wpDataSagas({ siteId }) {
  const { url } = yield select(deps.selectorCreators.getSite(siteId));
  const connection = new Wpapi({ endpoint: `https://cors.worona.io/${url}?rest_route=` });
  yield [
    takeEvery(types.CATEGORIES_LIST_REQUESTED, getCategories({ connection })),
    takeEvery(types.PAGES_LIST_REQUESTED, getPages({ connection })),
    put(actions.categoriesListRequested({ siteId })),
    put(actions.pagesListRequested({ siteId })),
  ];
}
