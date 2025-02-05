import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/authSlice';
import registerReducer from './features/registerSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'tokens'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  register: registerReducer,
  // Add loginSlice later
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
