import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVehicleData } from "../store/vehiclesSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./DataTable.css";

const DataTable = () => {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);
  const isEmpty = useSelector((state) => state.vehicles.isEmpty);
  const isLoading = useSelector((state) => state.vehicles.isLoading);
  const dataChanged = useSelector((state) => state.vehicles.dataUpdated);
  const displayData = [];

  useEffect(() => {
    dispatch(getVehicleData());
  }, [dispatch, dataChanged]);

  vehiclesList.map((brand) =>
    brand.vehicles.map((vehicle) =>
      displayData.push({
        name: vehicle.name,
        id: vehicle.id,
        brand: brand.name,
      })
    )
  );

  const compare = (a, b) => {
    let comparison = 0;
    if (a.id > b.id) {
      comparison = 1;
    } else if (a.id < b.id) {
      comparison = -1;
    }
    return comparison;
  };

  displayData.sort(compare);

  return (
    <div>
      {!isEmpty && !isLoading && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="label">Vehicle ID</p>
              </TableCell>
              <TableCell>
                <p className="label">Vehicle Name</p>
              </TableCell>
              <TableCell>
                <p className="label">Brand</p>
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
      )}
      {isEmpty && !isLoading && <p className="message">No Data Found</p>}
      {isLoading && <p className="message">Loading...</p>}
    </div>
  );
};

export default DataTable;
