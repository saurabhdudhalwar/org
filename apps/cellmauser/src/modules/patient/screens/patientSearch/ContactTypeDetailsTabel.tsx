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

const ContactTypeDetailsTabel = (props?: any) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={styles.tableColumn}>
              {translate("contactType", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("service", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("user", language)}
            </TableCell>
            <TableCell sx={styles.tableColumn}>
              {translate("clinicDate", language)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.rows?.map((row: any) => (
            <TableRow key={row?.sgrId}>
              <TableCell
                component="th"
                scope="row"
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.sgrVisitType ? row?.sgrVisitType : "-"}
              </TableCell>
              <TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.sgrCliName ? row?.sgrCliName : "-"}
              </TableCell>
              <TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.sgrUseUsername ? row?.sgrUseUsername : "-"}
              </TableCell>
              <TableCell sx={styles.tableData}>
                {row?.sgrDate ? moment(row?.sgrDate).format("DD/MM/YYYY") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTypeDetailsTabel;

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
