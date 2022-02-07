import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialVehiclesState = {
  vehiclesList: [],
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: initialVehiclesState,
  reducers: {
    setData(state, action) {
      state.vehiclesList = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    vehicles: vehiclesSlice.reducer,
  },
});

export const getVehicleData = () => {
  return async (dispatch) => {
    const responce = await fetch("http://127.0.0.1:8000/vehicles/brands/");
    const responceData = await responce.json();
    dispatch(vehiclesSlice.actions.setData(responceData));
  };
};

export const vehiclesActions = vehiclesSlice.actions;

export default store;
