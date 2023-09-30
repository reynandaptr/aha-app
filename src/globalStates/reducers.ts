import auth from './auth';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const reducers = combineReducers({
  auth,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
