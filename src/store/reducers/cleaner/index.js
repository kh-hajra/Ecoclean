import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cleaner: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  success: false,
  error: null,
};

const cleanerSlice = createSlice({
  name: 'cleaner',
  initialState,
  reducers: {
    setCleaner(state, action) {
      state.cleaner = action.payload.cleaner;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearCleanerState() {
      // Return a completely fresh state
      return initialState;
    },
    resetCleanerState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const { setCleaner, clearCleanerState, resetCleanerState } = cleanerSlice.actions;
export default cleanerSlice.reducer;