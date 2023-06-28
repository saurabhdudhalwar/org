import * as React from "react";

import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import translate from "../assets/translationFiles/commonTranslation";

type AppProviderProps = {
  children: React.ReactNode;
};

const errorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Oops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign("/cellmaUser/home")}
      >
        Back to home
      </Button>
    </div>
  );
};

const errorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  // API call to store error information
};

const AppProvider = ({ children }: AppProviderProps) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <React.Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
          <Typography variant="h2" sx={{ p: "10px" }}>
            {translate("loading", language)}...
          </Typography>
        </Box>
      }
    >
      <ErrorBoundary FallbackComponent={errorFallback} onError={errorHandler}>
        <Router>{children}</Router>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
