import * as deps from '../deps';
import * as selectorCreators from '../selectorCreators';

export const getMenuItemOpen = state => state.starterProTheme.menuItemOpen;
export const getThemeSettings = state =>
  deps.selectorCreators.getSettings('starterProTheme')(state);

export const getSelectedCategoriesList = state => {
  const siteId = deps.selectors.getSelectedSiteId(state);
  return selectorCreators.getCategoriesList(siteId)(state);
};
export const getSelectedPagesList = state => {
  const siteId = deps.selectors.getSelectedSiteId(state);
  return selectorCreators.getPagesList(siteId)(state);
};
export const getSelectedStatus = state => {
  const siteId = deps.selectors.getSelectedSiteId(state);
  return selectorCreators.getStatus(siteId)(state);
};
