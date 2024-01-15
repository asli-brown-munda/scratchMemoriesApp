import FilesTable from "./components/FilesTable.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <FilesTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
