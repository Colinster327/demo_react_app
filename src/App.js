import "./App.css";
import DataTable from "./components/DataTable";
import DataEntry from "./components/DataEntry";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <DataEntry />
        <DataTable />
      </TableContainer>
    </Container>
  );
}

export default App;
