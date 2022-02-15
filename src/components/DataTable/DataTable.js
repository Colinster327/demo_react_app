import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getVehicleData } from "../../store/vehiclesSlice/actionCreators";
import { vehiclesActions } from "../../store/vehiclesSlice/vehiclesSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel, TablePagination } from "@mui/material";

import "./DataTable.css";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const sortRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((element, index) => [element, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] > b[1] ? -1 : 1;
  });

  return stabilizedRowArray.map((element) => element[0]);
};

const DataTable = () => {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);
  const isEmpty = useSelector((state) => state.vehicles.isEmpty);
  const isLoading = useSelector((state) => state.vehicles.isLoading);
  const dataChanged = useSelector((state) => state.vehicles.dataUpdated);
  const displayData = [];

  vehiclesList.map((brand) =>
    brand.vehicles.map((vehicle) =>
      displayData.push({
        name: vehicle.name,
        id: vehicle.id,
        brand: brand.name,
      })
    )
  );

  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const sortLabelHandler = (property) => (event) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getVehicleData());
  }, [dispatch, dataChanged]);

  if (displayData.length > 0) {
    dispatch(vehiclesActions.setIsEmpty(false));
  }

  return (
    <div>
      {!isEmpty && !isLoading && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell key="id">
                <TableSortLabel
                  active={valueToOrderBy === "id"}
                  direction={valueToOrderBy === "id" ? orderDirection : "asc"}
                  onClick={sortLabelHandler("id")}
                >
                  <p className="label">Vehicle ID</p>
                </TableSortLabel>
              </TableCell>
              <TableCell key="name">
                <TableSortLabel
                  active={valueToOrderBy === "name"}
                  direction={valueToOrderBy === "name" ? orderDirection : "asc"}
                  onClick={sortLabelHandler("name")}
                >
                  <p className="label">Vehicle Name</p>
                </TableSortLabel>
              </TableCell>
              <TableCell key="brand">
                <TableSortLabel
                  active={valueToOrderBy === "brand"}
                  direction={
                    valueToOrderBy === "brand" ? orderDirection : "asc"
                  }
                  onClick={sortLabelHandler("brand")}
                >
                  <p className="label">Brand</p>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRowInformation(
              displayData,
              getComparator(orderDirection, valueToOrderBy)
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vehicle, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{vehicle.id}</TableCell>
                    <TableCell>{vehicle.name}</TableCell>
                    <TableCell>{vehicle.brand}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
      <TablePagination
        rowsPerPageOptions={[1, 2, 5, 10]}
        component="div"
        count={displayData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {isEmpty && !isLoading && <p className="message">No Data Found</p>}
      {isLoading && <p className="message">Loading...</p>}
    </div>
  );
};

export default DataTable;
