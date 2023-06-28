import * as Mui from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import { getGender } from "../../../utils/GeneralUtils";
import Barcode from "../assets/icons/Barcode.png";

const PatientLabelPrint = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const currentDate = new Date();
  const arr: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ];
  const patientDetails = props?.patientDetails;
  const image = Barcode;
  return (
    <Mui.Grid container paddingX={5}>
      <Mui.Grid
        item
        xs={6}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Mui.Typography>
          {moment(currentDate).format("DD/MM/YYYY, hh:mm A")}
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid
        item
        xs={6}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Mui.Typography>Untitled Document</Mui.Typography>
      </Mui.Grid>
      {arr.map((n) => (
        <Mui.Grid item container xs={2} key={n}>
          <Mui.Grid item xs={12}>
            <Mui.Typography>{patientId + 1000}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography>{patientDetails?.patFirstname}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography>{patientDetails?.patSurname}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography>
              {moment(patientDetails?.patDob).format("DD/MM/YYYY")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography>{getGender(patientDetails?.patSex)}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.backBoxGrid}>
            <Mui.Avatar
              variant="square"
              src={image}
              alt="Barcode Avatar"
              sx={styles.avatar}
            />
          </Mui.Grid>
        </Mui.Grid>
      ))}
    </Mui.Grid>
  );
};
export default PatientLabelPrint;

const styles = {
  title: {
    textAlign: "left",
    fontSize: "30px",
  },

  avatar: { width: "100px", height: "50px" },
  backBoxGrid: { display: "flex", justifyContent: "flex-start" },
};
