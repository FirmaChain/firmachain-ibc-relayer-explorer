import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { SnackbarProvider } from "notistack";
import App from "./App";
import theme from "./themes";
import { QueryClient, QueryClientProvider } from "react-query";
import DataProvider from "./context/dataProvider";
import TxProvider from "./context/txProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
        mutations: {},
    },
});

root.render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} style={{ fontSize: "16px" }} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <QueryClientProvider client={queryClient}>
                <TxProvider>
                    <DataProvider>
                        <App />
                    </DataProvider>
                </TxProvider>
            </QueryClientProvider>
        </SnackbarProvider>
    </ThemeProvider>
);
