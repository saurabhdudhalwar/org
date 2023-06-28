import React, { useState } from "react";

import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import VideoConsultationPopup from "./VideoConsultationPopup";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleClose: any;
}
const CallPatientPopup: React.FC<Props> = (props: any) => {
  const [isVideoConsultationPopup, setIsVideoConsultationPopup] =
    useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Common.CellmaPopup
        title={t("callingDetails")}
        fullScreen
        handleCancel={() => props.handleClose()}
      >
        <Mui.Grid container padding={2} spacing={2}>
          <Mui.Grid container item>
            <Mui.Grid item xs={12} sx={styles.callPatientHeader}>
              <Mui.Typography variant="h2" sx={styles.callPatientHeaderText}>
                {t("callPatientFromWaitingRoom")}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid container item spacing={2} columnSpacing={20}>
            <Mui.Grid item xs={4}>
              <Common.CellmaAutoSelectField
                label={t("selectLocation")}
                dummyData
                options={dummyData.LOCATIONS}
                getOptionLabel={(location: any) => location.label}
                renderOption={(props: any, location: any) => (
                  <li {...props}>{location.label}</li>
                )}
              />
            </Mui.Grid>
            <Mui.Grid item xs={4}>
              <Common.CellmaAutoSelectField
                label={t("selectZone")}
                dummyData
                options={dummyData.ZONE}
                getOptionLabel={(zone: any) => zone.label}
                renderOption={(props: any, zone: any) => (
                  <li {...props}>{zone.label}</li>
                )}
              />
            </Mui.Grid>
            <Mui.Grid item xs={4}>
              <Common.CellmaAutoSelectField
                label={t("selectRoom")}
                dummyData
                options={dummyData.ROOM}
                getOptionLabel={(room: any) => room.label}
                renderOption={(props: any, room: any) => (
                  <li {...props}>{room.label}</li>
                )}
              />
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Common.CellmaButton
                label={t("save")}
                onClick={() => {
                  props.handleClose();
                  dispatch(
                    setSnackbar(true, "success", t("callingDetailsSaved"), 2)
                  );
                }}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid container item>
            <Mui.Grid item xs={12} sx={styles.callPatientHeader}>
              <Mui.Typography variant="h2" sx={styles.callPatientHeaderText}>
                {t("callPatientForVideoConsultation")}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid container item>
            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Common.CellmaButton
                label={t("videoConsultation")}
                startIcon={
                  <VideoCameraFrontOutlinedIcon sx={styles.videoCameraIcon} />
                }
                onClick={() => setIsVideoConsultationPopup(true)}
              />
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
      {isVideoConsultationPopup && (
        <VideoConsultationPopup
          handleClose={() => setIsVideoConsultationPopup(false)}
        />
      )}
    </>
  );
};

export default CallPatientPopup;

export const styles = {
  callPatientHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  callPatientHeaderText: {
    color: "primary.dark",
  },
  videoCameraIcon: { height: "25px", width: "25px" },
};
