import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVehicleData } from "./store/index";

function App() {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);

  useEffect(() => {
    dispatch(getVehicleData());
  }, []);

  return (
    <div>
      {vehiclesList.map((obj) => {
        return (
          <div key={obj.id}>
            <h2>{obj.name}</h2>
            <ul>
              {obj.vehicles.map(vehicle => {
                return <li key={vehicle.id}>{vehicle.name}</li>
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
