import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import authUserReducer from './slices/authUserSlice';
import usersReducer from './slices/usersSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  authUser: authUserReducer,
  usersData: usersReducer
});


const persistConfig = {
  key: 'app-root',
  version: 1,
  storage,
  // You can add any other configurations here, like 'whitelist' or 'blacklist' for selective persistence.
};

const persistRootReducer = persistReducer(persistConfig, rootReducer);

// make redux store
const store = configureStore({
  reducer: persistRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store