import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVehicleData } from "./store/index";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);
  const displayData = [];

  useEffect(() => {
    dispatch(getVehicleData());
  }, [dispatch]);

  vehiclesList.map((brand) =>
    brand.vehicles.map((vehicle) =>
      displayData.push({
        name: vehicle.name,
        id: vehicle.id,
        brand: brand.name,
      })
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <p>Vehicle ID</p>
            </TableCell>
            <TableCell>
              <p>Vehicle Name</p>
            </TableCell>
            <TableCell>
              <p>Brand</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((obj) => {
            return (
              <TableRow
                key={obj.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {obj.id}
                </TableCell>
                <TableCell>{obj.name}</TableCell>
                <TableCell>{obj.brand}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
