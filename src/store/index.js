import { configureStore } from "@reduxjs/toolkit";
import vehiclesSlice from "./vehiclesSlice/vehiclesSlice";

const store = configureStore({
  reducer: {
    vehicles: vehiclesSlice.reducer,
  },
});

export default store;
