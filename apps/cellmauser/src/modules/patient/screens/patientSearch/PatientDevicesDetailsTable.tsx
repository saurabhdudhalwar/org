import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import translate from "../../assets/translationFiles/commonPatientTranslation";

interface Props {
  // insert props here
  rows?: any;
}

const PatientDevicesDetailsTable: React.FC<Props> = (props?: any) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <Mui.TableContainer component={Mui.Paper} elevation={0}>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("itemName", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("linkedToProcedure", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("deviceStatus", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("orderingStatus", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("date", language)}
            </Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {props?.rows?.map((row: any) => (
            <Mui.TableRow key={row.itemName}>
              <Mui.TableCell
                component="th"
                scope="row"
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.devName ? row?.devName : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.devProcedureName ? row?.devProcedureName : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.dedStatus ? row?.dedStatus : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.devOrderingStatus ? row?.devOrderingStatus : "-"}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tableData}>
                {row?.devCreated
                  ? moment(row?.devCreated).format("DD/MM/YYYY")
                  : "-"}
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
  );
};

export default PatientDevicesDetailsTable;

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
    margin: "10px",
    paddingX: "35px",
  },
};
