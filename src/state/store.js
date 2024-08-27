import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers"; // Import your combined reducers

const store = configureStore({
  reducer,
});

export default store;
