import { combineReducers } from 'redux';
import * as types from '../types';
import * as deps from '../deps';

export const showingMobileMenu = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_MOBILE_MENU:
      return !state;
    case types.CLOSE_MOBILE_MENU:
    case deps.types.ROUTER_DID_CHANGE:
      return false;
    default:
      return state;
  }
};

export default () => combineReducers({
  showingMobileMenu,
});
