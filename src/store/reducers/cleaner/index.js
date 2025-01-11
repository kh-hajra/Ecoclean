import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for registering a cleaner
export const registerCleaner = createAsyncThunk(
    "cleaner/register",
    async (cleanerData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "http://localhost8080/api/v1/users/registerCleaner",
          cleanerData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data
            ? error.response.data.message
            : error.message
        );
      }
    }
  );
  
const cleanerSlice = createSlice({
  name: 'cleaner',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCleanerState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCleaner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCleaner.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerCleaner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register cleaner';
      });
  },
});

export const { resetCleanerState } = cleanerSlice.actions;
export default cleanerSlice.reducer;
