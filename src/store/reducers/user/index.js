// features/user/slice/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,  // Start with user as null
    accessToken: null,  // Start with accessToken as null
  },
  reducers: {
  
    setUser(state, action) {
      console.log('Setting user data:', action.payload); // Log payload data here
      state.token = action.payload.accessToken;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      console.log();
      state.user = null;
      console.log(state.user);
    },
    setUserName(state, action) {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    setError(state, action) {
      state.error = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setUserProfileImage(state, action) {
      if (state.user) {
        state.user.profileUrl = action.payload;
      }
    },
 
  },

});

export const {
  setUser,
  setLoading,
  logoutUser,
  setError,
  setUserName,
  setUserProfileImage,
  setMetaMaskAccount,
  setPrivateKey,
} = userSlice.actions;
export default userSlice.reducer;
