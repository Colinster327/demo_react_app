import { vehiclesActions } from "./vehiclesSlice";
import { vehiclesPaths } from "../paths";

export const getVehicleData = () => {
  return async (dispatch) => {
    dispatch(vehiclesActions.setIsLoading());

    const responce = await fetch(
      process.env.REACT_APP_DEFAULT_PATH + vehiclesPaths.brands
    );
    const responceData = await responce.json();

    if (responceData.length > 0) {
      dispatch(vehiclesActions.setData(responceData));
    }

    dispatch(vehiclesActions.setIsLoading());
  };
};

export const postToVehicleData = (data) => {
  return async (dispatch) => {
    const response = await fetch(
      process.env.REACT_APP_DEFAULT_PATH + vehiclesPaths.vehicles,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.vehicle,
          brand: data.brandId,
        }),
      }
    );
    if (response.ok) {
      dispatch(vehiclesActions.toggleDataUpdated());
    }
  };
};

export const postToBrandData = (data) => {
  return async (dispatch) => {
    const response = await fetch(
      process.env.REACT_APP_DEFAULT_PATH + vehiclesPaths.brands,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      }
    );
    const responseJson = await response.json();
    if (response.ok) {
      dispatch(
        postToVehicleData({
          vehicle: data.vehicleName,
          brandId: responseJson.id,
        })
      );
    }
  };
};
