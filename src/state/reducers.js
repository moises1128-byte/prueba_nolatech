import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
