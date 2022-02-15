import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postToVehicleData, postToBrandData } from "../../store/vehiclesSlice/actionCreators";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./DataEntry.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataEntry = () => {
  const dispatch = useDispatch();
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);
  const [brandName, setBrandName] = useState("");
  const [vehicleName, setVehicleName] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    severity: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const capitalizeLeadingLetter = (str) =>
    str.trim().charAt(0).toUpperCase() + str.trim().toLowerCase().slice(1);

  const runThroughData = () => {
    for (let brand of vehiclesList) {
      if (brand.name.toLowerCase().trim() === brandName.toLowerCase().trim()) {
        for (let vehicle of brand.vehicles) {
          if (vehicle.name.toLowerCase().trim() === vehicleName.toLowerCase().trim()) {
            setVehicleName("");
            setMessage({
              message: "Error: Vehicle Already Exists",
              severity: "error",
            });
            setOpen(true);
            return true;
          }
        }
        dispatch(
          postToVehicleData({
            brandId: brand.id,
            vehicle: capitalizeLeadingLetter(vehicleName),
          })
        );
        setBrandName("");
        setVehicleName("");
        setMessage({
          message: "Vehicle Successfully Added!",
          severity: "success",
        });
        setOpen(true);
        return true;
      }
    }
    return false;
  };

  const handleSendData = () => {
    const added = runThroughData();
    if (added === false) {
      if (vehicleName.length > 0 && brandName.length > 0) {
        dispatch(
          postToBrandData({
            name: capitalizeLeadingLetter(brandName),
            vehicleName: capitalizeLeadingLetter(vehicleName),
          })
        );
        setBrandName("");
        setVehicleName("");
        setMessage({
          message: "Vehicle Successfully Added!",
          severity: "success",
        });
        setOpen(true);
      } else {
        setMessage({
          message: "Error: One or more of the text fields are empty",
          severity: "error",
        });
        setOpen(true);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    handleSendData();
  };

  const brandHandler = (event) => {
    setBrandName(event.target.value);
  };

  const vehicleHandler = (event) => {
    setVehicleName(event.target.value);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          onChange={brandHandler}
          value={brandName}
          id="brand-input"
          label="Brand"
          variant="outlined"
        />
        <TextField
          onChange={vehicleHandler}
          value={vehicleName}
          id="vehicle-input"
          label="Vehicle"
          variant="outlined"
        />
        <Button
          sx={{
            backgroundColor: "gray",
          }}
          type="submit"
          variant="contained"
          size="large"
        >
          Add New Vehicle
        </Button>
      </Box>
    </div>
  );
};

export default DataEntry;
