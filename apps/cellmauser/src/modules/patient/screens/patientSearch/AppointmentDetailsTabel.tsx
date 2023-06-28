import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import useGetPatientDisplay from "../../api/usePatientDisplay";
import translate from "../../assets/translationFiles/commonPatientTranslation";

const AppointmentDetailsTabel = (props?: any) => {
  const { data } = useGetPatientDisplay();
  const { language } = useSelector((state: any) => state.language);

  return (
    <Mui.TableContainer component={Mui.Paper} elevation={0}>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("appointment", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("status", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("type", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("reason", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("location", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("hp", language)}
            </Mui.TableCell>
            {data?.entity.showSeenBy && (
              <Mui.TableCell sx={styles.tableColumn}>
                {translate("seenBy", language)}
              </Mui.TableCell>
            )}
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("time", language)}
            </Mui.TableCell>
            <Mui.TableCell sx={styles.tableColumn}>
              {translate("date", language)}
            </Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {props?.rows?.map((row: any) => (
            <Mui.TableRow key={row?.reaId}>
              <Mui.TableCell
                component="th"
                scope="row"
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.reaCliName ? row?.reaCliName : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.reaStatus ? row?.reaStatus : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.reaType ? row?.reaType : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.reaReviewReason ? row?.reaReviewReason : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.reaLocation ? row?.reaLocation : "-"}
              </Mui.TableCell>
              <Mui.TableCell
                sx={styles.tableData}
                style={{ textTransform: "capitalize" }}
              >
                {row?.reaSeenbyEspFullName ? row?.reaSeenbyEspFullName : "-"}
              </Mui.TableCell>
              {data?.entity.showSeenBy && (
                <Mui.TableCell
                  sx={styles.tableData}
                  style={{ textTransform: "capitalize" }}
                >
                  {row?.reaSeenbyEspFullName ? row?.reaSeenbyEspFullName : "-"}
                </Mui.TableCell>
              )}
              <Mui.TableCell sx={styles.tableData}>
                {row?.reaTime ? row?.reaTime : "-"}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tableData}>
                {row?.reaDate ? moment(row?.reaDate).format("DD/MM/YYYY") : "-"}
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
  );
};

export default AppointmentDetailsTabel;

export const styles = {
  tableColumn: {
    color: "common.black",
    fontWeight: 600,
    margin: "10px",
  },
  tableData: {
    fontWeight: 400,
    color: "grey.500",
    margin: "10px",
  },
};
