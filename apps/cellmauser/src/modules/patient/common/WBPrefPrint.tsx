import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";
import Barcode from "../assets/icons/Barcode.png";
import QRScanner from "../assets/icons/QRScanner.png";
import translate from "../assets/translationFiles/commonPatientTranslation";

const WBPrefPrint = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { estCodePreference } = useSelector((state: any) => state.auth);
  const patientDetails = props?.patientDetails;
  return (
    <Mui.Grid container padding={5}>
      <Mui.Grid
        item
        container
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Mui.Typography sx={styles.title}>
          {translate("name", language)}: {patientDetails?.patSurname}&nbsp;
          {patientDetails?.patFirstname}
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={6}>
          <Mui.Typography sx={styles.title}>
            &nbsp;
            {translate("dob", language)}:
            {moment(patientDetails?.patDob).format("DD/MM/YYYY")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={6}>
          {!isUndefinedOrNullOrEmpty(patientDetails?.patIdentifier) ||
          !isUndefinedOrNullOrEmpty(patientDetails?.patNhsRef) ||
          !isUndefinedOrNullOrEmpty(patientDetails?.patHospitalRef) ? (
            <Mui.Typography sx={styles.title}>
              {translate("identNumber", language)}&nbsp;
              {(estCodePreference === "I" && patientDetails?.patIdentifier) ||
                (estCodePreference === "N" && patientDetails?.patNhsRef) ||
                (estCodePreference === "H" && patientDetails?.patHospitalRef)}
            </Mui.Typography>
          ) : (
            <Mui.Typography sx={styles.title}>
              {translate("identNumber", language)}&nbsp;
              {patientId + 1000}
            </Mui.Typography>
          )}
        </Mui.Grid>
      </Mui.Grid>

      <Mui.Grid item container>
        <Mui.Grid item xs={4} sx={styles.backBoxGrid}>
          <Mui.Avatar
            variant="square"
            src={QRScanner}
            alt="Barcode Avatar"
            sx={styles.qrAvatar}
          />
        </Mui.Grid>
        <Mui.Grid item xs={6} sx={styles.backBoxGrid}>
          <Mui.Avatar
            variant="square"
            src={Barcode}
            alt="Barcode Avatar"
            sx={styles.avatar}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};
export default WBPrefPrint;

const styles = {
  title: {
    textAlign: "center",
    paddingY: "30px",
    fontSize: "25px",
  },

  qrAvatar: {
    width: "150px",
    height: "150px",
  },
  avatar: { width: "400px", height: "80px" },
  backBoxGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
