import * as Mui from "@mui/material";
import Barcode from "react-barcode";
import { useSelector } from "react-redux";

import usePatientBarcode from "../api/usePatientBarcode";
import translate from "../assets/translationFiles/createPatientTranslation";

const IDCard = () => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: details } = usePatientBarcode();

  return (
    <Mui.Box sx={{ margin: "40px" }}>
      <Mui.Typography variant="subtitle1" sx={styles.title}>
        {translate("front", language)}
      </Mui.Typography>

      <Mui.Grid container sx={styles.box}>
        <Mui.Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            paddingY: "10px",
          }}
        >
          <Mui.Typography variant="subtitle1" sx={{ fontSize: "25px" }}>
            {details ? details.estName : null}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
          }}
        >
          <Mui.Typography sx={styles.healthCard}>
            {translate("healthCard", language)}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid container>
          <Mui.Grid item xs={6} sx={styles.nameTypography}>
            <Mui.Typography variant="subtitle2">
              {details ? `Name: ${details.patFullName}` : null}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={6} sx={styles.nameTypography}>
            <Mui.Typography variant="subtitle2">
              {details ? `ID: ${details.patBarcode.toString()}` : null}
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>

      <Mui.Box sx={{ paddingY: "30px" }}>
        <Mui.Typography variant="subtitle1" sx={styles.title}>
          {translate("back", language)}
        </Mui.Typography>
        <Mui.Grid container sx={styles.box}>
          <Mui.Grid item xs={12} sx={styles.backBoxGrid}>
            {details ? (
              <Barcode
                value={details.patientBarcode}
                displayValue={false}
                height={150}
                margin={0}
                width={2}
              />
            ) : null}
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </Mui.Box>
  );
};
export default IDCard;

const styles = {
  box: {
    fontSize: "12px",
    border: "1px solid",
    right: 0,
    left: 0,
    bgcolor: "background.paper",
    paddingX: "25px",
    paddingY: "0",
  },
  nameTypography: {
    paddingY: "10px",
    textAlign: "center",
    fontWeight: "500",
  },
  title: {
    textAlign: "center",
    paddingY: "30px",
    fontSize: "30px",
  },
  healthCard: {
    fontFamily: "monospace",
    fontWeight: "500",
    fontSize: "18px",
  },
  avatar: { width: "400px", height: "80px" },
  backBoxGrid: { display: "flex", justifyContent: "center", paddingY: "20px" },
};
