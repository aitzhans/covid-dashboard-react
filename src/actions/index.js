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

const countriesDataRequested = () => ({
  type: 'FETCH_COUNTRIES_REQUEST',
});

const countriesDataLoaded = (countries) => ({
  type: 'FETCH_COUNTRIES_SUCCESS',
  payload: countries
});

const globalDailyRequested = () => ({
  type: 'FETCH_GLOBAL_DAILY_REQUEST',
});

const globalDailyLoaded = (globalDaily) => ({
  type: 'FETCH_GLOBAL_DAILY_SUCCESS',
  payload: globalDaily
});

const countryDailyRequested = () => ({
  type: 'FETCH_COUNTRY_DAILY_REQUEST',
});

const countryDailyLoaded = (countryDaily) => ({
  type: 'FETCH_COUNTRY_DAILY_SUCCESS',
  payload: countryDaily
});

const countrySelected = (country) => ({
  type: 'COUNTRY_SELECTED',
  payload: country
});

const searchStarted = (country) => ({
  type: 'SEARCH_STARTED',
  payload: country
});

const countryDeselected = () => ({
  type: 'COUNTRY_DESELECTED'
});

const selectedCriteriaUpdated = (filter) => ({
  type: 'SELECTED_CRITERIA_UPDATED',
  payload: filter
});

export {
  globalDataRequested,
  globalDataLoaded,
  globalDataError,
  countriesDataRequested,
  countriesDataLoaded,
  globalDailyRequested,
  globalDailyLoaded,
  countryDailyRequested,
  countryDailyLoaded,
  countrySelected,
  countryDeselected,
  searchStarted,
  selectedCriteriaUpdated,
};
