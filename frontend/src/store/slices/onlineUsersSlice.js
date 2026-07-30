import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUserIds: [],
};

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUserIds = action.payload || [];
    },
  },
});

export const { setOnlineUsers } = onlineUsersSlice.actions;

export const selectOnlineUserIds = (state) => state.onlineUsers.onlineUserIds;

export default onlineUsersSlice.reducer;
