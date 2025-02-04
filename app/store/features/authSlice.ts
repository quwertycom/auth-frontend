import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string | null;
    email: string | null;
    username: string | null;
  };
  tokens: {
    access: string | null;
    refresh: string | null;
  };
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: null,
    email: null,
    username: null,
  },
  tokens: {
    access: null,
    refresh: null,
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{
      user: AuthState['user'];
      tokens: AuthState['tokens'];
    }>) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
    },
    clearAuth: () => initialState,
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
