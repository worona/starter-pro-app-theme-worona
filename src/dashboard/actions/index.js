import * as types from '../types';

export const menuItemOpened = ({ index }) => ({ type: types.MENU_ITEM_OPENED, index });
export const menuItemClosed = ({ index }) => ({ type: types.MENU_ITEM_CLOSED, index });
export const menuItemSortStarted = ({ index }) => ({
  type: types.MENU_ITEM_SORT_STARTED,
  index,
});
export const menuItemSortEnded = ({ oldIndex, newIndex }) => ({
  type: types.MENU_ITEM_SORT_ENDED,
  oldIndex,
  newIndex,
});
