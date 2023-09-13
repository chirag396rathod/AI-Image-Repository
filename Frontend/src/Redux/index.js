import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUsers: [],
  socket: null,
  messages: [],
};

const chatAppSlice = createSlice({
  name: "chatapp",
  initialState,
  reducers: {
    handleSetSocket: (state, action) => {
      state.socket = action.payload;
    },
    handleSetActiveUser: (state, action) => {
      state.activeUsers = action.payload;
    },
    handleStoreMessaged: (state, action) => {
      const isArray = Array.isArray(action.payload);

      if (isArray) {
        state.messages = action.payload;
      } else {
        state.messages = [...state.messages, action.payload];
      }
    },
  },
});

export default chatAppSlice.reducer;
export const { handleSetSocket, handleSetActiveUser, handleStoreMessaged } =
  chatAppSlice.actions;
