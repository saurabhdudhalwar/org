import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useSelector } from "react-redux";

import translate from "../../assets/translationFiles/commonPatientTranslation";

const AwaitingAcceptanceDetailsTabel = (props?: any) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={styles.tableColumn}>
              {translate("awaitingAcceptance", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("patientType", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("clinician", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("status", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("referralDate", language)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.rows?.map((row: any) => (
            <TableRow key={row?.refId}>
              <TableCell
                component="th"
                scope="row"
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.cliName ? row?.cliName : "-"}
              </TableCell>
              <TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.refPatientType ? row?.refPatientType : "-"}
              </TableCell>
              <TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.consultant ? row?.consultant : "-"}
              </TableCell>
              <TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.refId
                  ? "The referral to this service is awaiting acceptance."
                  : ""}
              </TableCell>
              <TableCell sx={styles.tableData}>
                {row?.date ? moment(row?.date).format("DD/MM/YYYY") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AwaitingAcceptanceDetailsTabel;

export const styles = {
  tableColumn: {
    color: "common.black",
    fontWeight: 600,
    paddingX: "35px",
    margin: "10px",
  },
  tableData: {
    fontWeight: 400,
    color: "grey.500",
    paddingX: "35px",
    margin: "10px",
  },
};
