import { combineReducers } from 'redux';
import * as types from '../types';
import * as deps from '../deps';

export const menuItemOpen = (state = false, { type, index, oldIndex, newIndex }) => {
  switch (type) {
    case types.MENU_ITEM_OPENED:
      return index;
    case types.MENU_ITEM_CLOSED:
    case 'redux-form/ARRAY_REMOVE':
    case deps.types.SITE_UNSELECTED:
    case deps.types.SITE_SELECTED:
      return false;
    case types.MENU_ITEM_SORT_ENDED:
      if (oldIndex === state) return newIndex;
      if (state !== false && oldIndex <= state && newIndex >= state) return state - 1;
      if (state !== false && oldIndex > state && newIndex <= state) return state + 1;
      return state;
    default:
      return state;
  }
}

export const categoriesList = (state = {}, action) => {
  if (action.type === types.CATEGORIES_LIST_SUCCEED) {
    return { ...state, [action.siteId]: action.categories };
  }
  return state;
}

export const pagesList = (state = {}, action) => {
  if (action.type === types.PAGES_LIST_SUCCEED) {
    return { ...state, [action.siteId]: action.pages };
  }
  return state;
}

export const categoriesStatus = (state = {}, { type, siteId }) => {
  switch (type) {
    case types.CATEGORIES_LIST_REQUESTED:
      return { ...state, [siteId]: 'fetching' };
    case types.CATEGORIES_LIST_SUCCEED:
      return { ...state, [siteId]: 'succeed' };
    case types.CATEGORIES_LIST_FAILED:
      return { ...state, [siteId]: 'error' };
    default:
      return state;
  }
}

export const pagesStatus = (state = {}, { type, siteId }) => {
  switch (type) {
    case types.PAGES_LIST_REQUESTED:
      return { ...state, [siteId]: 'fetching' };
    case types.PAGES_LIST_SUCCEED:
      return { ...state, [siteId]: 'succeed' };
    case types.PAGES_LIST_FAILED:
      return { ...state, [siteId]: 'error' };
    default:
      return state;
  }
}

export default () => combineReducers({
  menuItemOpen,
  categoriesList,
  pagesList,
  categoriesStatus,
  pagesStatus,
});
