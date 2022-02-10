import { configureStore } from "@reduxjs/toolkit";
import vehiclesSlice from "./vehiclesSlice";

const store = configureStore({
  reducer: {
    vehicles: vehiclesSlice.reducer,
  },
});

export default store;
