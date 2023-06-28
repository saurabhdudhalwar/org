import React from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/serviceHPAppointmentTranslation";

const DeleteServiceHPRecord = (props: any) => {
  const dispatch = useDispatch();

  return (
    <Common.CellmaPopup
      title={t("deleteHPClinicSchedule")}
      handleCancel={props?.handleCancel}
    >
      <Mui.Grid container padding={2}>
        <Mui.Grid item xs={12}>
          <Mui.Typography
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            {t("deleteRecordMessage")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          gap={1}
        >
          <Common.CellmaButton
            onClick={() => {
              dispatch(
                setSnackbar(
                  true,
                  "success",
                  t("hpClinicScheduleDeletedSuccessfully"),
                  4
                )
              );
              props?.handleCancel();
            }}
            label={t("ok")}
          />
          <Common.CellmaButton
            onClick={props?.handleCancel}
            label={t("cancel")}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default DeleteServiceHPRecord;
