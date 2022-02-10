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

export const getVehicleData = () => {
  return async (dispatch) => {
    dispatch(vehiclesSlice.actions.setIsLoading());

    const responce = await fetch("http://127.0.0.1:8000/vehicles/brands/");
    const responceData = await responce.json();

    if (responceData.length > 0) {
      dispatch(vehiclesSlice.actions.setData(responceData));
      dispatch(vehiclesSlice.actions.setIsEmpty(false));
    } else {
      dispatch(vehiclesSlice.actions.setIsEmpty(true));
    }

    dispatch(vehiclesSlice.actions.setIsLoading());
  };
};

export const postToVehicleData = (data) => {
  return async (dispatch) => {
    const responce = await fetch("http://127.0.0.1:8000/vehicles/vehicles/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.vehicle,
        brand: data.brandId,
      }),
    });
    if (responce.ok) {
      dispatch(vehiclesSlice.actions.toggleDataUpdated());
    }
  };
};

export const postToBrandData = (data) => {
  return async (dispatch) => {
    const responce = await fetch("http://127.0.0.1:8000/vehicles/brands/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name }),
    });
    if (responce.ok) {
      dispatch(getVehicleData());
      dispatch(
        postToVehicleData({
          vehicle: data.vehicleName,
          brandId: data.vehicleBrandId,
        })
      );
    }
  };
};

export const vehiclesActions = vehiclesSlice.actions;

export default vehiclesSlice;
