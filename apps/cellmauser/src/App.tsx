import { ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import theme from "./assets/theme/theme";
import * as Common from "./common/CommonComponentsIndex";
import AppProvider from "./providers/app";
import AppRoutes from "./routes";
import rootReducer from "./store/rootReducer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Common.CellmaSnackbar />
          <AppProvider>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen={false} />
          </AppProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};
export default App;
