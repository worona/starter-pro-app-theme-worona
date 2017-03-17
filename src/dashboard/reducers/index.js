import { combineReducers } from 'redux';
import * as types from '../types';

const menuItemOpen = (state = false, { type, index, oldIndex, newIndex }) => {
  switch (type) {
    case types.MENU_ITEM_OPENED:
      return index;
    case types.MENU_ITEM_CLOSED:
    case 'redux-form/ARRAY_REMOVE':
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

const currentMenuItems = (state = [], action) => {
  switch (action.type) {
    case types.MENU_ITEM_ADDED:
      return [...state, { type: 'Link', label: 'Edit me', url: '', id: 1 }];
    default:
      return state;
  }
};

export default () => combineReducers({
  menuItemOpen,
  currentMenuItems,
});
