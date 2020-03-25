export const updateSelectedCatalog = (state, id) => {
  state.selectedCatalog = id;
};

export const updateCatalogs = (state, catalogs) => {
  state.catalogs = catalogs;
};
