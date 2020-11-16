import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import locationsReducer from './locations.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  locations: locationsReducer,
});

export default rootReducer;
