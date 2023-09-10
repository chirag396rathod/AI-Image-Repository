import { configureStore } from "@reduxjs/toolkit";
import ChatAppReducer from "../Redux/index";

const Store = configureStore({
  reducer: {
    chatapp: ChatAppReducer,
  },
});

export default Store;
