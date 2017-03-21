import * as deps from '../deps';

export const getMenuItemOpen = state => state.starterProTheme.menuItemOpen;
export const getCurrentMenuItems = state => state.starterProTheme.currentMenuItems;
export const getCategoriesList = state => state.starterProTheme.categoriesList;
export const getPagesList = state => state.starterProTheme.pagesList;
export const getThemeSettings = state =>
  deps.selectorCreators.getSettings('starterProTheme')(state);
