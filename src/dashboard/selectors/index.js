import * as deps from '../deps';

export const getMenuItemOpen = state => state.starterProTheme.menuItemOpen;
export const getCurrentMenuItems = state => state.starterProTheme.currentMenuItems;
export const getThemeSettings = state =>
deps.selectorCreators.getSettings('starterProTheme')(state);
