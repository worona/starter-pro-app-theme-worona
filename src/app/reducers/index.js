import { combineReducers } from 'redux';
import * as types from '../types';

export const showingMobileMenu = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_MOBILE_MENU:
      return !state;
    case types.CLOSE_MOBILE_MENU:
      return false;
    default:
      return state;
  }
};

export default () => combineReducers({
  showingMobileMenu,
});
