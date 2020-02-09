import { AsyncStorage } from 'react-native';
import NavService from '../../navigation/NavigationService';
import * as actionTypes from './types';

export const signIn = formValues => (dispatch, getState, { mernApi }) => {
  dispatch({ type: actionTypes.SIGN_IN });
  return mernApi
    .post('/auth/signin', formValues)
    .then(response => {
      dispatch(signInSuccess(response.data));
      NavService.navigate('Main');
      setAuthInfoAsync(response.data, mernApi);
    })
    .catch(err => {
      dispatch(signInFail(err.response.data.error));
    });
};

const signInSuccess = payload => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload
  };
};

const signInFail = payload => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    payload
  };
};

export const tryLocalSignIn = () => (dispatch, getState, { mernApi }) => {
  dispatch({ type: actionTypes.TRY_LOCAL_SIGN_IN });
  getAuthInfoAsync().then(
    authInfo => {
      const now = Math.floor(Date.now() / 1000);
      if (!authInfo || (authInfo && authInfo.expiresAt <= now)) {
        dispatch(tryLocalSignInFail());
        NavService.navigate('SignIn');
        return Promise.resolve();
      }
      // if token age > 30 days, then refresh token
      if (authInfo.expiresAt <= now + 30 * 24 * 60 * 60) {
        mernApi.setAuthToken(authInfo.token);
        return mernApi.post('auth/refresh-token').then(
          response => {
            authInfo.token = response.data.token;
            authInfo.expiresAt = response.data.expiresAt;
            dispatch(tryLocalSignInSuccess(authInfo));
            NavService.navigate('Main');
            setAuthInfoAsync(authInfo, mernApi);
          },
          err => {
            dispatch(tryLocalSignInFail());
            NavService.navigate('SignIn');
          }
        );
      } else {
        dispatch(tryLocalSignInSuccess(authInfo));
        NavService.navigate('Main');
        return Promise.resolve();
      }
    },
    err => {
      dispatch(tryLocalSignInFail());
      NavService.navigate('SignIn');
    }
  );
};

const tryLocalSignInSuccess = payload => (dispatch, getState, { mernApi }) => {
  setAuthInfoAsync(payload, mernApi);
  dispatch({
    type: actionTypes.TRY_LOCAL_SIGN_IN_SUCCESS,
    payload
  });
};

const tryLocalSignInFail = () => (dispatch, getState, { mernApi }) => {
  clearAuthInfoAsync(mernApi);
  dispatch({ type: actionTypes.TRY_LOCAL_SIGN_IN_FAIL });
};

export const signOut = () => (dispatch, getState, { mernApi }) => {
  dispatch({ type: actionTypes.SIGN_OUT });
  clearAuthInfoAsync(mernApi);
  dispatch({ type: actionTypes.SIGN_OUT_SUCCESS });
  NavService.navigate('SignIn');
};

export const signUp = formValues => (dispatch, getState, { mernApi }) => {
  dispatch({ type: actionTypes.SIGN_UP });
  return mernApi.post('/auth/signup', formValues).then(
    response => {
      dispatch({ type: actionTypes.SIGN_UP_SUCCESS });
      NavService.navigate('SignIn');
    },
    err => {
      dispatch(signUpFail(err.response.data.error));
    }
  );
};

const signUpFail = payload => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    payload
  };
};

export const requestVerificationEmail = formValues => {
  return (dispatch, getState, { mernApi }) => {
    dispatch({ type: actionTypes.REQUEST_VERIFICATION_EMAIL });
    return mernApi.post('/auth/send-token', formValues).then(
      response => {
        dispatch({ type: actionTypes.REQUEST_VERIFICATION_EMAIL_SUCCESS });
      },
      err => {
        dispatch(requestVerificationEmailFail(err.response.data.error));
      }
    );
  };
};

const requestVerificationEmailFail = payload => {
  return {
    type: actionTypes.REQUEST_VERIFICATION_EMAIL_FAIL,
    payload
  };
};

export const requestPasswordReset = formValues => {
  return (dispatch, getState, { mernApi }) => {
    dispatch({ type: actionTypes.REQUEST_PASSWORD_RESET });
    return mernApi.post('/auth/send-token', formValues).then(
      response => {
        dispatch({ type: actionTypes.REQUEST_PASSWORD_RESET_SUCCESS });
      },
      err => {
        dispatch(requestPasswordResetFail(err.response.data.error));
      }
    );
  };
};

const requestPasswordResetFail = payload => {
  return {
    type: actionTypes.REQUEST_PASSWORD_RESET_FAIL,
    payload
  };
};

export const unloadAuthScreen = () => {
  return {
    type: actionTypes.UNLOAD_AUTH_SCREEN
  };
};

const setAuthInfoAsync = (authInfo, mernApi) => {
  mernApi.setAuthToken(authInfo.token);
  return AsyncStorage.setItem('authInfo', JSON.stringify(authInfo)).then(
    () => {},
    err => {}
  );
};

const getAuthInfoAsync = () => {
  return AsyncStorage.getItem('authInfo').then(authInfo => {
    return JSON.parse(authInfo);
  });
};

const clearAuthInfoAsync = mernApi => {
  mernApi.setAuthToken('');
  return AsyncStorage.removeItem('authInfo').then(
    () => {},
    err => {}
  );
};