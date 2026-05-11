'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// #region UI State Types
interface UiState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  dashboardFilters: {
    category?: string;
    minRating?: number;
    minReviewCount?: number;
    searchText?: string;
  };
}
// #endregion

// #region UI Initial State
const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
  dashboardFilters: {},
};
// #endregion

// #region UI Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setDashboardFilters: (state, action: PayloadAction<UiState['dashboardFilters']>) => {
      state.dashboardFilters = { ...state.dashboardFilters, ...action.payload };
    },
    clearDashboardFilters: (state) => {
      state.dashboardFilters = {};
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  setDashboardFilters,
  clearDashboardFilters,
} = uiSlice.actions;
export default uiSlice.reducer;
// #endregion
