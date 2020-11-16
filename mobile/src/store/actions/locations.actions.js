import * as actionTypes from './types';

export const getLocations = () => (dispatch, getState, { mernApi }) => {
  dispatch({ type: actionTypes.GET_LOCATIONS_LOADING });
  return mernApi.get('/api/dams').then(
    (response) => {
      dispatch({
        type: actionTypes.GET_LOCATIONS_SUCCESS,
        payload: response.data,
      });
    },
    (err) => {
      dispatch({
        type: actionTypes.GET_LOCATIONS_FAIL,
        payload: err.response.data.error.message,
      });
    }
  );
};
