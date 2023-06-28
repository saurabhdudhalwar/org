import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import CellmaLogo from "../../../assets/logos/CellmaLogo.png";
import * as Common from "../../../common/CommonComponentsIndex";
import t from "../assets/translationFiles/ServiceBookAppointmentTranslation";
import RoomsCalenderDayView from "../screens/serviceBookAppointment/RoomsCalenderDayView";

interface Props {
  handleClose: any;
}
const AppointmentsRoomsCalenderPopup: React.FC<Props> = (props: any) => {
  return (
    <Common.CellmaPopup
      fullScreen
      title={t("appointmentRoomsCalender")}
      handleCancel={props?.handleClose}
    >
      <Mui.Grid item sx={styles.calenderGrid}>
        <RoomsCalenderDayView />
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};
export default AppointmentsRoomsCalenderPopup;

const styles = {
  calenderGrid: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
};
