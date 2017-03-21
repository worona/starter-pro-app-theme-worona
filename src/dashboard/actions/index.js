import * as types from '../types';

export const menuItemOpened = ({ index }) => ({ type: types.MENU_ITEM_OPENED, index });
export const menuItemClosed = ({ index }) => ({ type: types.MENU_ITEM_CLOSED, index });
export const menuItemSortStarted = ({ index }) => ({ type: types.MENU_ITEM_SORT_STARTED, index });
export const menuItemSortEnded = ({ oldIndex, newIndex, newMenuItems }) => ({
  type: types.MENU_ITEM_SORT_ENDED,
  oldIndex,
  newIndex,
  newMenuItems,
});
export const menuItemDeleted = ({ index }) => ({ type: types.MENU_ITEM_DELETED, index });
export const menuItemAdded = () => ({ type: types.MENU_ITEM_ADDED });

export const categoriesListRequested = () => ({ type: types.CATEGORIES_LIST_REQUESTED });
export const categoriesListSucceed = ({ categories }) => ({
  type: types.CATEGORIES_LIST_SUCCEED,
  categories,
});
export const categoriesListFailed = ({ error }) => ({ type: types.CATEGORIES_LIST_FAILED, error });

export const pagesListRequested = () => ({ type: types.PAGES_LIST_REQUESTED });
export const pagesListSucceed = ({ pages }) => ({
  type: types.PAGES_LIST_SUCCEED,
  pages,
});
export const pagesListFailed = ({ error }) => ({ type: types.PAGES_LIST_FAILED, error });
