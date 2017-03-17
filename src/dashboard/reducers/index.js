import { combineReducers } from 'redux';
import * as types from '../types';

const menuItemOpen = (state = false, { type, index, oldIndex, newIndex }) => {
  switch (type) {
    case types.MENU_ITEM_OPENED:
      return index;
    case types.MENU_ITEM_CLOSED:
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

export default () => combineReducers({
  menuItemOpen,
});
