import { createSlice } from "@reduxjs/toolkit";

const initialVehiclesState = {
  vehiclesList: [],
  isLoading: false,
  isEmpty: true,
  dataUpdated: false,
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: initialVehiclesState,
  reducers: {
    setData(state, action) {
      state.vehiclesList = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    setIsEmpty(state, action) {
      state.isEmpty = action.payload;
    },
    toggleDataUpdated(state) {
      state.dataUpdated = !state.dataUpdated;
    },
  },
});

export const vehiclesActions = vehiclesSlice.actions;

export default vehiclesSlice;
