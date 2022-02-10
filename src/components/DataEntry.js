import "./DataEntry.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postToVehicleData, postToBrandData } from "../store/vehiclesSlice";

const DataEntry = () => {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);
  const [brandName, setBrandName] = useState("");
  const [vehicleName, setVehicleName] = useState("");

  const runThrowData = () => {
    for (let brand of vehiclesList) {
      if (brand.name.toLowerCase() === brandName.toLowerCase()) {
        for (let vehicle of brand.vehicles) {
          if (vehicle.name.toLowerCase() === vehicleName.toLowerCase()) {
            return true; //Error: Vehicle Already Exists
          }
        }
        dispatch(
          postToVehicleData({
            brandExists: true,
            brandId: brand.id,
            vehicle: vehicleName,
          })
        );
        return true;
      }
    }
    return false;
  };

  const handleSendData = () => {
    const added = runThrowData();
    if (added === false) {
      if (vehicleName.length > 0) {
        dispatch(
          postToBrandData({
            name: brandName,
            vehicleName: vehicleName,
            vehicleBrandId: vehiclesList.length + 1,
          })
        );
        runThrowData();
      } else {
        return "Please Enter A Vehicle Model.";
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    handleSendData();

    setBrandName("");
    setVehicleName("");
  };

  const brandHandler = (event) => {
    setBrandName(event.target.value);
  };

  const vehicleHandler = (event) => {
    setVehicleName(event.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          value={brandName}
          id="brand_input"
          type="text"
          placeholder="Brand Name"
          onChange={brandHandler}
        />
        <input
          value={vehicleName}
          id="vehicle_input"
          type="text"
          placeholder="Vehicle Name"
          onChange={vehicleHandler}
        />
        <button type="submit">Post Data</button>
      </form>
    </div>
  );
};

export default DataEntry;
