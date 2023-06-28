import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface Props {
  children?:any;
}

export const CellmaCard: React.FC<Props> = (props) => {
  const errorFallback = (props: FallbackProps) => {
    const { resetErrorBoundary } = props;
    return (
      <div
        className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
        role="alert"
      >
        <h2 className="text-lg font-semibold">Oops, something went wrong</h2>
        <Button
          className="mt-4"
          onClick={resetErrorBoundary}
          // onClick={() => window.location.assign("/cellmaUser/home")}
        >
          Try again
        </Button>
      </div>
    );
  };

  const errorHandler = (error: Error, info: { componentStack: string }) => {
    // Do something with the error
    // E.g. log to an error logging client here

    console.log("Error : ", error);
    console.log("Info : ", info);

    // API call to store error information
  };

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "32px",
        boxShadow: 2,
        padding: { sm: "20px" },
        flexDirection: "column",
        width: "100%",
      }}
    >
      <ErrorBoundary FallbackComponent={errorFallback} onError={errorHandler}>
        {props.children}
      </ErrorBoundary>
    </Card>
  );
};

export default CellmaCard;
