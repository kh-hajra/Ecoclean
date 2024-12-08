// features/user/slice/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    setUser(state, action) {
      state.user = action.payload;
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
    setUserProfileImage(state, action) {
      if (state.user) {
        state.user.profileUrl = action.payload;
      }
    },
 
  },
});

export const {
  setUser,
  logoutUser,
  setUserName,
  setUserProfileImage,
  setMetaMaskAccount,
  setPrivateKey,
} = userSlice.actions;
export default userSlice.reducer;
