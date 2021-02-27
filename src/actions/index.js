const globalDataRequested = () => ({
  type: 'FETCH_GLOBAL_REQUEST',
});

const globalDataLoaded = (global) => ({
  type: 'FETCH_GLOBAL_SUCCESS',
  payload: global,
});

const globalDataError = (error) => ({
  type: 'FETCH_GLOBAL_FAILURE',
  payload: error,
});

const countriesDataLoaded = (countries) => ({
  type: 'FETCH_COUNTRIES_SUCCESS',
  payload: countries
});

export {
  globalDataRequested,
  globalDataLoaded,
  globalDataError,
  countriesDataLoaded,
};
