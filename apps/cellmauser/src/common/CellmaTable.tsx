import { JSXElementConstructor, useEffect, useState } from "react";

import { Search } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  DataGrid,
  gridClasses,
  GridColumns,
  GridRowIdGetter,
  useGridApiContext,
} from "@mui/x-data-grid";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "./CommonComponentsIndex";
import translate from "../assets/translationFiles/commonTranslation";
import { setPageNumber } from "../modules/patient/store/PatientAction";
import { handleSearch } from "../utils/GeneralUtils";

const CustomPagination = (listCount: any, list: any) => {
  const dispatch = useDispatch();
  const { pageNumber } = useSelector((state: any) => state.patient);
  const apiRef = useGridApiContext();
  const count = Math.ceil(listCount / 10);
  if (list?.length !== 0)
    return (
      <Pagination
        color="primary"
        count={list?.length === 0 ? 0 : count}
        page={pageNumber}
        onChange={(event, value) => {
          apiRef.current.setPage(value - 1);
          dispatch(setPageNumber(value));
        }}
      />
    );
  return null;
};

interface CellmaTableProps {
  getRowId?: GridRowIdGetter<any> | undefined;
  listCount?: number;
  rows: readonly any[];
  searchField?: boolean;
  searchLabel?: any;
  columns: GridColumns<any>;
  noRecordsMessage: string;
  Toolbar?: JSXElementConstructor<any> | null | undefined;
  pageSize?: number; // correct ?
  onRowClick?: any;
}

const CellmaTable: React.FC<CellmaTableProps> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const [searchedRows, setSearchedRows] = useState<readonly any[]>(props.rows);
  const { pageNumber } = useSelector((state: any) => state.patient);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setSearchedRows(props?.rows);
  }, [setSearchedRows, props?.listCount, props?.rows]);

  useEffect(() => {
    dispatch(setPageNumber(1));
  }, [props?.listCount, dispatch]);

  useEffect(() => {
    setSearchValue("");
  }, [pageNumber]);

  const errorFallback = () => {
    return (
      <Grid container rowSpacing={1}>
        {props.searchField && (
          <Grid
            item
            container
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item sx={{ maxWidth: "600px" }}>
              <Common.CellmaInputField
                label={
                  props.searchLabel
                    ? props.searchLabel
                    : translate("search", language)
                }
                endIcon={<Search />}
                onHandleChange={(event: any) => {
                  setSearchValue(event.target.value);
                  handleSearch(
                    event.target.value,
                    setSearchedRows,
                    props?.rows
                  );
                }}
                value={searchValue}
              />
            </Grid>
          </Grid>
        )}
        <Grid item sx={styles.dataGrid}>
          <DataGrid
            sx={{
              width: "100%",

              "& .MuiDataGrid-columnHeaderTitle": {
                textOverflow: "auto",
                whiteSpace: "break-spaces",
                lineHeight: 1.5,
                overflowY: "auto",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "2px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "grey.100",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "grey.400",
                },
                maxHeight: "50px",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                display: "flex",
                alignItems: "flex-end",
                py: "5px",
              },
            }}
            rows={[]}
            columns={props?.columns}
            getRowId={props?.getRowId}
            pageSize={10}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            onRowClick={props?.onRowClick}
            autoHeight
            components={{
              Pagination: () => CustomPagination(props?.listCount, props?.rows),
              NoRowsOverlay: () => (
                <Typography sx={styles.noData}>Something went wrong</Typography>
              ),
              Toolbar: props.Toolbar,
            }}
            onPageChange={(newPage) => {
              dispatch(setPageNumber(newPage + 1));
            }}
          />
        </Grid>
      </Grid>
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
    <ErrorBoundary FallbackComponent={errorFallback} onError={errorHandler}>
      <Grid container rowSpacing={1}>
        {props.searchField && (
          <Grid
            item
            container
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item sx={{ maxWidth: "600px" }}>
              <Common.CellmaInputField
                label={
                  props.searchLabel
                    ? props.searchLabel
                    : translate("search", language)
                }
                endIcon={<Search />}
                onHandleChange={(event: any) => {
                  setSearchValue(event.target.value);
                  handleSearch(
                    event.target.value,
                    setSearchedRows,
                    props?.rows
                  );
                }}
                value={searchValue}
              />
            </Grid>
          </Grid>
        )}
        <Grid item sx={styles.dataGrid}>
          <DataGrid
            getRowHeight={() => "auto"}
            sx={{
              width: "100%",
              [`& .${gridClasses.cell}`]: {
                py: 1,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textOverflow: "auto",
                whiteSpace: "break-spaces",
                lineHeight: 1.5,
                overflowY: "auto",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "2px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "grey.100",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "grey.400",
                },
                maxHeight: "50px",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                display: "flex",
                alignItems: "flex-end",
                py: "5px",
              },
            }}
            rows={searchedRows}
            columns={props?.columns}
            getRowId={props?.getRowId}
            pageSize={10}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            onRowClick={props?.onRowClick}
            autoHeight
            components={{
              Pagination: () => CustomPagination(props?.listCount, props?.rows),
              NoRowsOverlay: () => (
                <Typography sx={styles.noData}>
                  {props?.noRecordsMessage}
                </Typography>
              ),
              Toolbar: props.Toolbar,
            }}
            onPageChange={(newPage) => {
              dispatch(setPageNumber(newPage + 1));
            }}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};

export default CellmaTable;

const styles = {
  dataGrid: {
    minWidth: "100%",
    "& .tableHeader": {
      backgroundColor: "secondary.main",
      flex: 1,
      minWidth: 200,
      display: "flex",
      "& > .MuiDataGrid-columnSeparator": {
        // visibility: "hidden",
      },
    },
    ".MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
      outline: 0,
    },
    ".MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: 0,
    },

    "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
      display: "none",
    },
  },
  noData: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20px",
  },
};
