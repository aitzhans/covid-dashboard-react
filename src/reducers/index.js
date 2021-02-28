const initialState = {
  loading: true,
  error: null,
  loadingCountries: true,
  errorCountries: null,
  loadingDaily: true,
  errorDaily: null,
  global: {
    lastUpdated: "02-25-2021",
    population: null,
    totalConfirmed: 1254635,
    totalRecovered: null,
    totalDeaths: null,
    newConfirmed: null,
    newRecovered: null,
    newDeaths: null,
  },
  countries: [],
  selectedCountry: null,
  selectedCriteria: 'totalConfirmed',
  searchQuery: null,
  currentGraph: {
    dailyConfirmedIncrements: null,
    dailyDeathsIncrements: null,
    dailyRecoveredIncrements: null,
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GLOBAL_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_GLOBAL_SUCCESS':
      return {
        ...state,
        global: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_COUNTRIES_SUCCESS':
      return {
        ...state,
        countries: action.payload,
        loadingCountries: false,
        errorCountries: null
      };

    case 'FETCH_GLOBAL_DAILY_REQUEST':
      return {
        ...state,
        loadingDaily: true,
        errorDaily: null
      };

    case 'FETCH_GLOBAL_DAILY_SUCCESS':
      return {
        ...state,
        currentGraph: action.payload,
        loadingDaily: false,
        errorDaily: null
      };

    case 'FETCH_COUNTRY_DAILY_REQUEST':
      return {
        ...state,
        loadingDaily: true,
        errorDaily: null
      };

    case 'FETCH_COUNTRY_DAILY_SUCCESS':
      return {
        ...state,
        currentGraph: action.payload,
        loadingDaily: false,
        errorDaily: null
      };

    case 'COUNTRY_SELECTED':
      return {
        ...state,
        selectedCountry: action.payload,
        searchQuery: null
      };

    case 'COUNTRY_DESELECTED':
      return {
        ...state,
        selectedCountry: null,
        searchQuery: null
      };

    case 'SEARCH_STARTED':
      return {
        ...state,
        selectedCountry: null,
        searchQuery: action.payload
      };

    case 'SELECTED_CRITERIA_UPDATED':
      console.log(action.payload);
      return {
        ...state,
        selectedCriteria: action.payload
      };

    default:
      return state;
    }
};

export default reducer;
