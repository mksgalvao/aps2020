import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  locations: [],
  loading: false,
  fail: false,
};

const locationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_LOCATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
      };
    case actionTypes.GET_LOCATIONS_FAIL:
      return {
        ...state,
        fail: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default locationsReducer;
