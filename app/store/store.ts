import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './features/authSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    // Ignore write errors
  }
};

export const store = configureStore<{ auth: AuthState }>({
  reducer: {
    auth: authReducer,
  },
  preloadedState: loadState(),
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
