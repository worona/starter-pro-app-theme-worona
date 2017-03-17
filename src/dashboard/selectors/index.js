import * as deps from '../deps';

export const getMenuItemOpen = state => state.starterProTheme.menuItemOpen;
export const getThemeSettings = state =>
deps.selectorCreators.getSettings('starterProTheme')(state);
