import React, { useRef } from "react";

import * as Mui from "@mui/material";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import translate from "../../assets/translationFiles/createPatientTranslation";

interface Props {
  handleCancel(): unknown;
  rows: any[];
  columns: any[];
  mode: string;
  listCount?: number;
}
const ExportInterestedPartyList: React.FC<Props> = (props) => {
  const componentToPrint = useRef<any>();
  const { language } = useSelector((state: any) => state.language);
  const columns = props.columns.map((column) => {
    if (column.headerName !== "Select") return column.headerName;
  });
  const columnFields = props.columns.map((column) => {
    if (column.headerName !== "Select") return column.field;
  });
  const rows = props.rows.map((row) => {
    const rowList: any[] = [];
    let val;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < columnFields.length; i++) {
      val = row[columnFields[i]] ?? "";
      val = val === 1 || val === "1" ? "Yes" : val;
      val = val === 0 || val === "0" ? "No" : val;
      rowList.push(val);
    }

    return rowList;
  });

  const generateFile = (type: "csv" | "xml" | "xls") => {
    const objectKeys = [...columns] as const;
    type ObjectData = {
      [K in (typeof objectKeys)[number]]: string;
    };
    const dataObjectlist: ObjectData[] = [];

    rows.forEach((row) => {
      const obj = {} as ObjectData;
      let key: string;
      let value: string;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= columns.length; i++) {
        key = columns[i];
        value = row[i] ?? "";
        obj[key as keyof ObjectData] = value;
      }
      dataObjectlist.push(obj);
    });

    let exportType;
    const data = dataObjectlist;
    const fileName = "exportedList";

    switch (type) {
      case "csv":
        exportType = exportFromJSON.types.csv;
        break;
      case "xml":
        exportType = exportFromJSON.types.xml;
        break;
      case "xls":
        exportType = exportFromJSON.types.xls;
        break;
      default:
        throw new Error("type incorrect");
    }

    exportFromJSON({ data, fileName, exportType });
  };

  const generatePDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    autoTable(doc, { styles: { fontSize: 6 }, head: [columns], body: rows });
    doc.save("exportedList.pdf");
  };

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={
          props.mode === "patient list"
            ? translate("patientList", language)
            : translate("interestedPartyList", language)
        }
        handleCancel={() => props?.handleCancel()}
      >
        <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "left" }}
          >
            <Mui.Typography variant="h4" sx={{ color: "primary.main" }}>
              {`${props?.listCount} ${translate("displayRecord", language)}`}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid ref={componentToPrint} item xs={12}>
            <CellmaTable
              rows={props.rows}
              getRowId={(row: any) => {
                if (row.pipId) return row.pipId;
                if (row.patId) return row.patId;
              }}
              columns={props.columns}
              listCount={props?.listCount}
              noRecordsMessage={translate("noRecordsFound", language)}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Stack
              direction="row"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Mui.Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center", mr: "10px" }}
              >
                {translate("exportTo", language)}:{" "}
              </Mui.Typography>
              <Common.CellmaLink
                label="CSV"
                onClick={() => generateFile("csv")}
                variant="h5"
              >
                CSV
              </Common.CellmaLink>
              <Mui.Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={styles.divider}
              />
              <Common.CellmaLink
                label="Excel"
                onClick={() => generateFile("xls")}
                variant="h5"
              >
                Excel
              </Common.CellmaLink>{" "}
              <Mui.Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={styles.divider}
              />
              <Common.CellmaLink
                label="XML"
                onClick={() => generateFile("xml")}
                variant="h5"
              >
                XML
              </Common.CellmaLink>{" "}
              <Mui.Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={styles.divider}
              />
              <Common.CellmaLink label="PDF" onClick={generatePDF} variant="h5">
                PDF
              </Common.CellmaLink>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default ExportInterestedPartyList;
export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },

  divider: {
    borderRightWidth: 2,
    minHeight: "15px",
    color: "grey.900",
    margin: "5px",
  },

  link: { display: "flex", justifyContent: "flex-start", width: "100%" },
};
