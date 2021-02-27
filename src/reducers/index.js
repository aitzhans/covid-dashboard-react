const initialState = {
  loading: true,
  error: null,
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
  searchQuery: null,
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
        loading: false,
        error: null
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

    default:
      return state;
    }
};

export default reducer;
