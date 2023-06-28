import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PauseIcon from "@mui/icons-material/Pause";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import ShareIcon from "@mui/icons-material/Share";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleClose: any;
}

export const CONSULTATION_BUTTON = [
  {
    id: 1,
    label: "startVideoConsultation",
  },
  {
    id: 2,
    label: "startAudioConsultation",
  },
  {
    id: 3,
    label: "leaveConsultation",
  },
];

const VideoConsultationPopup: React.FC<Props> = (props: any) => {
  const [consultationButtonSelected, setConsultationButtonSelected] = useState(
    "startVideoConsultation"
  );
  const [recordingSelected, setIsRecordingSelected] = useState("");
  const [shareLinkPopup, setIsShareLinkPopup] = useState(false);
  const [leaveConsultationPopup, setIsLeaveConsultationPopup] = useState(false);
  const [recordingAnchor, setRecordingAnchor] = useState<null | HTMLElement>(
    null
  );
  const openRecording = Boolean(recordingAnchor);

  const dispatch = useDispatch();

  // handler for set recording anchor
  const handleRecordingClick = (event: React.MouseEvent<HTMLElement>) => {
    setRecordingAnchor(event.currentTarget);
  };
  // handler for recording anchor close
  const handleRecordingClose = () => {
    setRecordingAnchor(null);
  };

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={t("videoConferencing")}
        fullScreen
        handleCancel={() => props.handleClose()}
      >
        <Mui.Grid container padding={1}>
          <Mui.Grid item xs={12} sx={styles.popupHeader}>
            <Mui.Typography variant="h2" sx={{ color: "primary.dark" }}>
              {t("appointmentDetails")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container padding={2} spacing={2}>
            <Mui.Grid item container xs={6}>
              <Mui.Typography variant="h3">{t("service")}:</Mui.Typography>
              &nbsp;
              <Mui.Typography variant="h3">GUM/SRH Service</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item container xs={6}>
              <Mui.Typography variant="h3">{t("type")}:</Mui.Typography>
              &nbsp;
              <Mui.Typography variant="h3">New</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item container xs={6}>
              <Mui.Typography variant="h3">{t("location")}:</Mui.Typography>
              &nbsp;
              <Mui.Typography variant="h3">Archway Center</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item container xs={6}>
              <Mui.Typography variant="h3">{t("hp")}:</Mui.Typography>
              &nbsp;
              <Mui.Typography variant="h3">F2FC AC Four</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item container xs={6}>
              <Mui.Typography variant="h3">{t("date")}:</Mui.Typography>
              &nbsp;
              <Mui.Typography variant="h3">23-11-2022</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item container xs={6}>
              <Mui.Typography variant="h3">{t("time")}:</Mui.Typography>
              &nbsp;
              <Mui.Typography variant="h3">10:15:00</Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography
              variant="h2"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {t("patientLastLogged")} 11-04-2018
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item container padding={4}>
            {CONSULTATION_BUTTON.map((consultationButton: any) => (
              <Mui.Grid
                item
                xs={4}
                key={consultationButton.id}
                sx={styles.consultationButton}
              >
                <Common.CellmaButton
                  label={t(`${consultationButton.label}`)}
                  borderColor={
                    consultationButtonSelected === consultationButton.label
                      ? "primary.dark"
                      : "common.white"
                  }
                  color={
                    consultationButtonSelected === consultationButton.label
                      ? "primary.dark"
                      : "common.black"
                  }
                  backgroundColor={
                    consultationButtonSelected === consultationButton.label
                      ? "primary.light"
                      : "grey.200"
                  }
                  borderRadius={5}
                  onClick={() => {
                    if (consultationButton.label === "leaveConsultation") {
                      setIsLeaveConsultationPopup(true);
                      setConsultationButtonSelected(consultationButton.label);
                    } else {
                      setConsultationButtonSelected(consultationButton.label);
                    }
                  }}
                />
              </Mui.Grid>
            ))}
          </Mui.Grid>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Mui.Box sx={styles.imageCard}>
              <Mui.Grid
                item
                xs={12}
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                gap={1}
              >
                <Mui.Avatar
                  variant="square"
                  sx={styles.avatar}
                  onClick={handleRecordingClick}
                >
                  <MoreVertIcon sx={styles.iconColor} />
                </Mui.Avatar>
                <Mui.Backdrop open={openRecording} sx={{ zIndex: 1200 }}>
                  <Mui.Menu
                    anchorEl={recordingAnchor}
                    open={openRecording}
                    onClose={handleRecordingClose}
                    sx={{ marginLeft: "-150px", marginTop: "10px" }}
                    PaperProps={{
                      sx: styles.anchor,
                    }}
                  >
                    <Mui.MenuItem
                      selected={recordingSelected === "startRecording"}
                      sx={styles.menuItemText}
                      onClick={() => {
                        setIsRecordingSelected("startRecording");
                        handleRecordingClose();
                      }}
                    >
                      <RadioButtonCheckedOutlinedIcon
                        sx={{
                          color:
                            recordingSelected === "startRecording"
                              ? "warning.dark"
                              : "common.black",
                        }}
                      />
                      &nbsp; {t("startRecording")}
                    </Mui.MenuItem>
                    <Mui.Divider variant="middle" />
                    <Mui.MenuItem
                      selected={recordingSelected === "stopRecording"}
                      sx={styles.menuItemText}
                      onClick={() => {
                        if (recordingSelected) {
                          setIsRecordingSelected("stopRecording");
                          handleRecordingClose();
                        }
                      }}
                    >
                      <PauseIcon
                        sx={{
                          color: "common.black",
                        }}
                      />
                      &nbsp; {t("stopRecording")}
                    </Mui.MenuItem>
                  </Mui.Menu>
                </Mui.Backdrop>
                <Mui.Tooltip title={t("shareLink")} placement="bottom" arrow>
                  <Mui.Avatar
                    variant="square"
                    sx={styles.avatar}
                    onClick={() => setIsShareLinkPopup(true)}
                  >
                    <ShareIcon sx={styles.iconColor} />
                  </Mui.Avatar>
                </Mui.Tooltip>
              </Mui.Grid>
              <Mui.Grid item xs={12} sx={styles.videoCameraGrid}>
                <VideoCameraFrontOutlinedIcon
                  sx={styles.videoCameraIcon}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                />
              </Mui.Grid>
            </Mui.Box>
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
      {shareLinkPopup && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            title={t("contactDetail")}
            handleCancel={() => setIsShareLinkPopup(false)}
          >
            <Mui.Grid container sx={styles.contactDetailsGrid} gap={1}>
              <Mui.Grid item xs={8}>
                <Common.CellmaInputField label={t("email")} />
              </Mui.Grid>
              <Mui.Grid item xs={2}>
                <Common.CellmaButton
                  label={t("sendLink")}
                  onClick={() =>
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        t("emailSentSuccessfully"),
                        2
                      )
                    )
                  }
                />
              </Mui.Grid>
              <Mui.Grid item xs={8}>
                <Common.CellmaInputField label={t("mobile")} />
              </Mui.Grid>
              <Mui.Grid item xs={2}>
                <Common.CellmaButton
                  label={t("sendLink")}
                  onClick={() =>
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        t("textMessageSentSuccessfully"),
                        2
                      )
                    )
                  }
                />
              </Mui.Grid>
            </Mui.Grid>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
      {leaveConsultationPopup && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            title={t("confirmation")}
            handleCancel={() => setIsLeaveConsultationPopup(false)}
          >
            <Mui.Grid container padding={2}>
              <Mui.Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Mui.Typography variant="h4">
                  {t("leaveConsultationText")}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Common.CellmaButton
                  label={t("ok")}
                  onClick={() => {
                    setIsLeaveConsultationPopup(false);
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        t("conversationWillEnded"),
                        2
                      )
                    );
                  }}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
    </Mui.Backdrop>
  );
};

export default VideoConsultationPopup;

const styles = {
  consultationButton: {
    display: "flex",
    justifyContent: "center",
  },
  imageCard: {
    width: "500px",
    height: "300px",
    backgroundColor: "grey.300",
    borderRadius: "10px",
  },
  videoCameraIcon: { height: "50px", width: "50px" },
  menuItemText: {
    "&.Mui-selected": {
      backgroundColor: "secondary.main",
      color: "primary.dark",
    },
    "&:hover": { backgroundColor: "secondary.main", color: "primary.dark" },
    whiteSpace: "unset",
  },
  popupHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  avatar: {
    width: "25px",
    height: "25px",
    backgroundColor: "common.white",
    border: 2,
    borderColor: "grey.400",
    "&:hover": {
      borderColor: "primary.main",
    },
    cursor: "pointer",
  },
  videoCameraGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    cursor: "pointer",
  },
  contactDetailsGrid: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconColor: {
    color: "grey.400",
    "&:hover": {
      color: "primary.main",
    },
  },
  anchor: {
    overflow: "visible",
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 10,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 1500,
    },
  },
};
