import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { SnackbarProvider } from "notistack";
import App from "./App";
import theme from "./themes";
import DataProvider from "./context/dataProvider";
import TxProvider from "./context/txProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} style={{ fontSize: "16px" }} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <TxProvider>
                <DataProvider>
                    <App />
                </DataProvider>
            </TxProvider>
        </SnackbarProvider>
    </ThemeProvider>
);
