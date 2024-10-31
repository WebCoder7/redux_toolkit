import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import crudSlice from "./slices/crudSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    crud: crudSlice,
  },
});
export default store;
