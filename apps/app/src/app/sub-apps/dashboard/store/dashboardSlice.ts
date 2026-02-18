import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  widgetCount: number;
  lastRefreshed: string | null;
}

const initialState: DashboardState = {
  widgetCount: 0,
  lastRefreshed: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setWidgetCount(state, action: PayloadAction<number>) {
      state.widgetCount = action.payload;
    },
    refreshed(state) {
      state.lastRefreshed = new Date().toISOString();
    },
  },
});

export const { setWidgetCount, refreshed } = dashboardSlice.actions;
