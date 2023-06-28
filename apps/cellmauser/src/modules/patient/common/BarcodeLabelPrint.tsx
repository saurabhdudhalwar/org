import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";
import Barcode from "../assets/icons/Barcode.png";
import translate from "../assets/translationFiles/commonPatientTranslation";

const BarcodeLabelPrint = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const currentDate = new Date();
  const patientDetails = props?.patientDetails;
  return (
    <Mui.Grid container sx={{ padding: "20px" }}>
      <Mui.Grid item>
        {" "}
        <Mui.Typography sx={styles.title}>
          {translate("patientBarcode", language)}{" "}
          {moment(currentDate).format("DD/MM/YYYY")}
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={styles.backBoxGrid}>
        <Mui.Avatar
          variant="square"
          src={Barcode}
          alt="Barcode Avatar"
          sx={styles.avatar}
        />
      </Mui.Grid>
      <Mui.Grid item>
        <Mui.Typography sx={styles.title}>
          {!isUndefinedOrNullOrEmpty(patientDetails?.patIdentifier) &&
            patientDetails?.patIdentifier}
          &nbsp;
          {patientId + 1000} {patientDetails?.patFirstname}&nbsp;
          {patientDetails?.patSurname}
        </Mui.Typography>
      </Mui.Grid>
    </Mui.Grid>
  );
};
export default BarcodeLabelPrint;

const styles = {
  title: {
    textAlign: "left",
    fontSize: "25px",
  },
  avatar: { width: "300px", height: "50px" },
  backBoxGrid: { display: "flex", justifyContent: "flex-start" },
};
