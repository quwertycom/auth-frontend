import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/app/store/features/authSlice';
import { HeroUIProvider } from '@heroui/react';
import { RootState } from '@/app/store/store';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { store as appStore } from '../../app/store/store';

afterEach(() => {
  cleanup();
  appStore.dispatch({ type: 'auth/resetUsername' });
});

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

function render(
  ui: React.ReactElement,
  {
    preloadedState = {} as Partial<RootState>,
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </Provider>
    );
  }
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

export * from '@testing-library/react';
export { render };
