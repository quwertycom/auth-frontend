import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  username: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    resetUsername: (state) => {
      state.username = null
    }
  }
})

export const { setUsername, resetUsername } = authSlice.actions
export default authSlice.reducer 