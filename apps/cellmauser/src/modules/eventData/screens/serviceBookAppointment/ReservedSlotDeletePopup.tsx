import React from "react";

import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import { useDeleteReserveCalendarSlot } from "../../api/useServiceBookAppointment";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

interface Props {
  handleCancel?: any;
  handleReservedSlot?: any;
  handleSelectedSlot?: any;
  handleSelectedHPAndDate?: any;
  resId: any;
}

const ReservedSlotDeletePopup: React.FC<Props> = (props) => {
  // Api call delete reserve calendar slot
  const { mutate: deleteReserveCalendarSlot } = useDeleteReserveCalendarSlot();

  return (
    <Common.CellmaPopup
      title={t("deleteReservedSlot")}
      handleCancel={() => {
        props.handleCancel();
      }}
    >
      <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2" sx={styles.popupText}>
            {t("deleteAboutReservedSlot")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2" sx={styles.popupText}>
            {t("deleteMsg")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          gap={2}
        >
          <Common.CellmaButton
            label={t("ok")}
            onClick={() => {
              deleteReserveCalendarSlot(props?.resId, {
                onSuccess: (response: any) => {
                  if (response.status === 200) {
                    if (
                      response?.data?.validationCode ===
                      "reserved.appointment.slot.delete.success"
                    ) {
                      props.handleReservedSlot();
                      props.handleSelectedSlot();
                      props.handleSelectedHPAndDate();
                      props.handleCancel();
                    }
                    props.handleCancel();
                  }
                },
              });
            }}
          />
          <Common.CellmaButton
            label={t("cancel")}
            onClick={() => props.handleCancel()}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ReservedSlotDeletePopup;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "10px",
    paddingX: "35px",
  },
  popupText: {
    display: "flex",
    justifyContent: "center",
  },
};
