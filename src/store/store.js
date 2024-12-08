import { configureStore, combineReducers } from "@reduxjs/toolkit";


import auth from "../store/reducers/auth/index.js";
import user from "../store/reducers/user/index.js";

// Create a noop storage for SSR



// Combine reducers
const rootReducer = combineReducers({
  auth,
  user,
  // Add other reducers here
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
});