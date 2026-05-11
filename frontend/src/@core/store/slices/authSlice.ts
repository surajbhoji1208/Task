'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@ui-module/auth';

// #region Auth State Types
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
// #endregion

// #region Auth Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};
// #endregion

// #region Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        document.cookie = 'auth_token=; path=/; max-age=0; samesite=strict';
      }
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
// #endregion
