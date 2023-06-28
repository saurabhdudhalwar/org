import { useEffect } from "react";

import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import { useGetSinglePatientDetails } from "../../api/useSinglePatientDetails";
import translate from "../../assets/translationFiles/commonPatientTranslation";

interface Props {
  rows?: any;
}

const PatientProceduresDetailsTable: React.FC<Props> = (props?: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);

  const {
    refetch: getGetSinglePatientDetails,
    data: getSinglePatientDetailsResponse,
  } = useGetSinglePatientDetails(patientId);

  const settings = getSinglePatientDetailsResponse?.settings ?? {};

  useEffect(() => {
    getGetSinglePatientDetails();
  }, [getGetSinglePatientDetails, language]);

  return (
    <Mui.TableContainer component={Mui.Paper} elevation={0}>
      {settings?.displayProcedureDeviceList === 1 && (
        <Mui.Table>
          <Mui.TableHead>
            <Mui.TableRow>
              <Mui.TableCell sx={styles.tableColumn}>
                {translate("procedureName", language)}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tableColumn}>
                {translate("site", language)}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tableColumn}>
                {translate("completedDate", language)}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tableColumn}>
                {translate("clinicLocation", language)}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tableColumn}>
                {translate("performedByHp", language)}
              </Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableHead>
          <Mui.TableBody>
            {props?.rows?.map((row: any) => (
              <Mui.TableRow key={row?.prdId}>
                <Mui.TableCell
                  component="th"
                  scope="row"
                  sx={styles.tableData}
                  style={{ textTransform: "capitalize" }}
                >
                  {row?.prdText ? row.prdText : "-"}
                </Mui.TableCell>
                <Mui.TableCell
                  sx={styles.tableData}
                  style={{ textTransform: "capitalize" }}
                >
                  {row?.prdSite ? row?.prdSite : "-"}
                </Mui.TableCell>
                <Mui.TableCell sx={styles.tableData}>
                  {row?.prdProcedureDate
                    ? moment(row?.prdProcedureDate).format("DD/MM/YYYY")
                    : "-"}
                </Mui.TableCell>
                <Mui.TableCell
                  sx={styles.tableData}
                  style={{ textTransform: "capitalize" }}
                >
                  {row?.prdCllName ? row?.prdCllName : "-"}
                </Mui.TableCell>
                <Mui.TableCell
                  sx={styles.tableData}
                  style={{ textTransform: "capitalize" }}
                >
                  {row?.prdEspFullName ? row?.prdEspFullName : "-"}
                </Mui.TableCell>
              </Mui.TableRow>
            ))}
          </Mui.TableBody>
        </Mui.Table>
      )}
    </Mui.TableContainer>
  );
};

export default PatientProceduresDetailsTable;

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
