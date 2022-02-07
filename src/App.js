import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVehicleData } from "./store/index";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function App() {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);

  useEffect(() => {
    dispatch(getVehicleData());
  }, []);

  return (
    <div>
      {vehiclesList.map((car) => {
        return (
          <div key={car.id}>
            <h2>{car.name}</h2>
            <ul>
              {car.vehicles.map(vehicle => {
                return (
                  <li key={vehicle.id}>{vehicle.name}</li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
