import { createSelector } from 'reselect';

export const getCategoriesList = siteId => state => state.starterProTheme.categoriesList[siteId];
export const getPagesList = siteId => state => state.starterProTheme.pagesList[siteId];
export const getCategoriesStatus = siteId =>
  state => state.starterProTheme.categoriesStatus[siteId];
export const getPagesStatus = siteId => state => state.starterProTheme.pagesStatus[siteId];
export const getStatus = siteId => createSelector(
  getCategoriesStatus(siteId),
  getPagesStatus(siteId),
  (categories, pages) => {
    if (categories === 'error' || pages === 'error') return 'error';
    else if (categories === 'fetching' || pages === 'fetching') return 'fetching';
    else if (categories === 'succeed' && pages === 'succeed') return 'succeed';
    return 'idle';
  },
);
