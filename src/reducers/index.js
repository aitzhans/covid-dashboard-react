import { act } from "react-dom/test-utils";

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
      console.log(action.payload);
      return {
        ...state,
        global: action.payload,
        loading: false,
        error: null
      };

    default:
      return state;
    }
};

export default reducer;
