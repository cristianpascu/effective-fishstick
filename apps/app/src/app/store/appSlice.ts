import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  /** ID of the currently active sub-app, or null when none is loaded. */
  activeSubApp: string | null;
}

const initialState: AppState = {
  activeSubApp: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveSubApp(state, action: PayloadAction<string | null>) {
      state.activeSubApp = action.payload;
    },
  },
});

export const { setActiveSubApp } = appSlice.actions;
