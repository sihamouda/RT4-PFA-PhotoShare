// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  fullName?: string;
  email?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.fullName = undefined;
      state.email = undefined;
    },
    signup(state, action: PayloadAction<{ fullName: string; email: string; password: string }>) {
      state.isAuthenticated = true;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
