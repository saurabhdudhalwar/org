import { MouseEventHandler } from "react";

import * as Mui from "@mui/material";
import { styled } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

import "jspdf-autotable";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import translate from "../../assets/translationFiles/usersListsTranslation";

interface Props {
  fields?: any;
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  usersList?: any;
  listCount?: any;
}
export const UserExportList: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  let rows: any[] = [];

  if (props?.usersList !== undefined) {
    rows = props?.usersList;
  }

  const columns: GridColDef[] = [
    {
      field: "useUsername",
      headerName: translate("username", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 150,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useUsername ? params?.row?.useUsername : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "useFirstname",
      headerName: translate("givenName", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 150,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useFirstname ? params?.row?.useFirstname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "useSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useSurname ? params?.row?.useSurname : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "cliName",
      headerName: translate("userService", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.cliName ? params?.row?.cliName : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "useProfession",
      headerName: translate("profession", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 140,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useProfession ? params?.row?.useProfession : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "useActive",
      headerName: translate("active", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useActive ? params?.row?.useActive : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "useLoggedIn",
      headerName: translate("online", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useLoggedIn ? params?.row?.useLoggedIn : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "useSubscribe",
      headerName: translate("subscribed", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 140,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.useSubscribe ? params?.row?.useSubscribe : "-"}
        </Mui.Typography>
      ),
    },
  ];

  const Item = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "left",
  }));

  // mapping user data
  const userData = rows?.map((colName: any) => [
    colName?.useUsername,
    colName?.useFirstname,
    colName?.useSurname,
    colName.cliName,
    colName.useProfession,
    colName.useActive,
    colName.useLoggedIn,
    colName.useSubscribe,
  ]);

  // Handler for export table to pdf
  const handlerExportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "User Lists";
    const headers = [columns.map((colName: any) => [colName.headerName])];
    const content = {
      startY: 50,
      head: headers,
      body: userData,
      styles: { halign: "left" },
      tableLineWidth: 0.75,
    };

    doc.text(title, marginLeft, 40);
    (doc as any).autoTable(content);
    doc.save("UserList.pdf");
  };

  // Handle for export table to excel
  const handlerExportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(userData);
    /* custom headers */
    XLSX.utils.sheet_add_aoa(
      workSheet,
      [columns.map((colName: any) => colName.headerName)],
      {
        origin: "A1",
      }
    );
    const workBook = {
      Sheets: { UserList: workSheet },
      SheetNames: ["UserList"],
    };
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "UserList.xlsx");
  };

  // Handler for export table to csv
  const csvHeader = columns.map((colName: any) => colName.headerName);

  const csvReport = {
    data: userData,
    headers: csvHeader,
    filename: "UserList.csv",
  };

  // Handler for export table to xml

  const handlerExportXML = () => {
    const data = userData;
    const fileName = "UserList";
    const fields = props.fields ? props.fields : [];
    const exportType = "xml";
    exportFromJSON({ data, fileName, fields, exportType });
  };
  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={translate("records", language)}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid container spacing={2} padding={2}>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "left" }}
          >
            <Mui.Typography variant="h4" sx={{ color: "primary.main" }}>
              {`${
                props?.listCount > 1000 ? 1000 : props?.listCount
              } ${translate("displayRecord", language)}`}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <CellmaTable
              searchField
              rows={rows}
              columns={columns}
              listCount={props?.listCount > 1000 ? 1000 : props?.listCount}
              getRowId={(row: any) => row.useUsername}
              noRecordsMessage="No user found"
            />
          </Mui.Grid>

          <Mui.Grid item xs={12}>
            <Mui.Stack
              direction="row"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Item>
                <Mui.Typography variant="h3">
                  {translate("exportTo", language)}:{" "}
                </Mui.Typography>
              </Item>
              <Item>
                <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
                  <Common.CellmaLink label="CSV">CSV</Common.CellmaLink>{" "}
                </CSVLink>
              </Item>
              <Mui.Divider
                orientation="vertical"
                flexItem
                color="black"
                variant="middle"
                sx={styles.divider}
              />
              <Item>
                <Common.CellmaLink
                  label="Excel"
                  onClick={() => handlerExportExcel()}
                >
                  Excel
                </Common.CellmaLink>{" "}
              </Item>
              <Mui.Divider
                orientation="vertical"
                flexItem
                color="black"
                variant="middle"
                sx={styles.divider}
              />
              <Item>
                <Common.CellmaLink
                  label="XML"
                  onClick={() => handlerExportXML()}
                >
                  XML
                </Common.CellmaLink>{" "}
              </Item>
              <Mui.Divider
                orientation="vertical"
                flexItem
                color="black"
                variant="middle"
                sx={styles.divider}
              />
              <Item>
                <Common.CellmaLink
                  label="PDF"
                  onClick={() => handlerExportPDF()}
                >
                  PDF
                </Common.CellmaLink>
              </Item>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export const styles = {
  popupGridContainer: {
    paddingY: "15px",
    paddingX: "35px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginX: "20px",
  },
  divider: {
    borderRightWidth: 2,
    minHeight: "15px",
  },
};
