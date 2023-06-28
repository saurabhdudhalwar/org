import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleCancel: any;
  handleStatus: any;
}

const StatusButton = (props: any) => {
  return (
    <Common.CellmaButton
      label={props.label}
      borderColor={props?.isSelected ? "primary.dark" : "common.white"}
      color={props?.isSelected ? "primary.dark" : "common.black"}
      backgroundColor={props?.isSelected ? "primary.light" : "grey.200"}
      borderRadius={5}
      onClick={() => {
        props.onClick();
      }}
    />
  );
};

const AppointmentStatusPopup: React.FC<Props> = (props: any) => {
  const [selectedStatusButton, setSelectedStatusButton] = useState(
    props.handleStatus
  );
  const [hpSeen, setHpSeen] = useState("");
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(appointmentStatusPopupForm?.errors).length !== 0) {
      appointmentStatusPopupForm.validateForm(
        appointmentStatusPopupForm?.values
      );
    }
  }, [language]);

  const showSnackbar = () => {
    if (selectedStatusButton === "Cancel") {
      dispatch(setSnackbar(true, "success", t("appointmentCancel"), 2));
    } else if (selectedStatusButton === "Delete") {
      dispatch(setSnackbar(true, "success", t("appointmentDelete"), 2));
    } else {
      dispatch(setSnackbar(true, "success", t("appointmentStatusSaved"), 2));
    }
  };

  const appointmentStatusPopupForm = useFormik({
    initialValues: {
      hpSeenDifferentToAppointment: "",
      healthProfessional: "",
      cancellation: "",
      deletion: "",
      rescheduled: "",
      appointmentReason: "",
      notes: "",
    },
    validationSchema: yup.object().shape({
      healthProfessional: yup
        .object()
        .nullable()
        .required(t("healthProfessionalRequired")),
      cancellation: yup.object().nullable().required(t("cancellationRequired")),
      deletion: yup.object().nullable().required(t("deletionRequired")),
      rescheduled: yup.object().nullable().required(t("rescheduledRequired")),
    }),
    onSubmit: (values: any) => {
      props?.handleCancel();
      showSnackbar();
    },
  });

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={t("appointmentStatus")}
        fullScreen
        handleCancel={() => props.handleCancel()}
      >
        <form onSubmit={appointmentStatusPopupForm.handleSubmit} noValidate>
          <Mui.Grid
            container
            padding={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Mui.Grid container item xs={12} sx={styles.popupHeader}>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h2" sx={styles.textGrid}>
                  {t("appointmentWith")}: Derms Conson
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h2" sx={styles.textGrid}>
                  {t("dateAndTime")}: 18/11/2022 at 09:45
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h2" sx={styles.textGrid}>
                  {t("appointmentDuration")}: 15 Min
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Grid item xs={11.5} container spacing={5} paddingY={2}>
              {props.handleStatus === "Scheduled" && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("scheduled")}
                    onClick={() => {
                      setSelectedStatusButton("Scheduled");
                    }}
                    isSelected={selectedStatusButton === "Scheduled"}
                  />
                </Mui.Grid>
              )}
              {(props.handleStatus === "Scheduled" ||
                props.handleStatus === "Waiting" ||
                props.handleStatus === "Waited Not Seen") && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("rescheduled")}
                    onClick={() => {
                      setSelectedStatusButton("Rescheduled");
                    }}
                    isSelected={selectedStatusButton === "Rescheduled"}
                  />
                </Mui.Grid>
              )}
              {(props.handleStatus === "Scheduled" ||
                props.handleStatus === "Waiting") && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("waiting")}
                    onClick={() => {
                      setSelectedStatusButton("Waiting");
                    }}
                    isSelected={selectedStatusButton === "Waiting"}
                  />
                </Mui.Grid>
              )}
              {(props.handleStatus === "Scheduled" ||
                props.handleStatus === "Waiting" ||
                props.handleStatus === "Waited Not Seen") && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("waitedNotSeen")}
                    onClick={() => {
                      setSelectedStatusButton("Waited Not Seen");
                    }}
                    isSelected={selectedStatusButton === "Waited Not Seen"}
                  />
                </Mui.Grid>
              )}
              {(props.handleStatus === "Scheduled" ||
                props.handleStatus === "Waiting" ||
                props.handleStatus === "Waited Not Seen" ||
                props.handleStatus === "Attended") && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("attended")}
                    onClick={() => {
                      setSelectedStatusButton("Attended");
                    }}
                    isSelected={selectedStatusButton === "Attended"}
                  />
                </Mui.Grid>
              )}
              {(props.handleStatus === "Scheduled" ||
                props.handleStatus === "Waiting" ||
                props.handleStatus === "Waited Not Seen" ||
                props.handleStatus === "Attended") && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("attendedLeft")}
                    onClick={() => {
                      setSelectedStatusButton("Attended Left");
                    }}
                    isSelected={selectedStatusButton === "Attended Left"}
                  />
                </Mui.Grid>
              )}
              {props.handleStatus === "Scheduled" && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("didNotAttend")}
                    onClick={() => {
                      setSelectedStatusButton("Did Not Attend");
                    }}
                    isSelected={selectedStatusButton === "Did Not Attend"}
                  />
                </Mui.Grid>
              )}
              {(props.handleStatus === "Scheduled" ||
                props.handleStatus === "Waiting" ||
                props.handleStatus === "Waited Not Seen") && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("cancel")}
                    onClick={() => {
                      setSelectedStatusButton("Cancel");
                    }}
                    isSelected={selectedStatusButton === "Cancel"}
                  />
                </Mui.Grid>
              )}
              {props.handleStatus === "Scheduled" && (
                <Mui.Grid item sx={styles.statusButton}>
                  <StatusButton
                    label={t("delete")}
                    onClick={() => {
                      setSelectedStatusButton("Delete");
                    }}
                    isSelected={selectedStatusButton === "Delete"}
                  />
                </Mui.Grid>
              )}
            </Mui.Grid>
            <Mui.Grid item container spacing={3} padding={2}>
              {(selectedStatusButton === "Attended" ||
                selectedStatusButton === "Attended Left") && (
                <Mui.Grid item container>
                  <Mui.Grid item xs={4}>
                    <Mui.Typography>
                      {t("hpSeenDifferentToAppointment")}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={3.7}>
                    <Common.CellmaAutoSelectField
                      label={t("hpSeenDifferentToAppointment")}
                      name="hpSeenDifferentToAppointment"
                      ariaLabel="hpSeenDifferentToAppointment"
                      options={dummyData.IS_HP_SEEN}
                      value={
                        appointmentStatusPopupForm.values
                          .hpSeenDifferentToAppointment ?? ""
                      }
                      getOptionLabel={(hpSeenDifferentToAppointment: any) =>
                        hpSeenDifferentToAppointment.name ?? "No"
                      }
                      renderOption={(
                        props: any,
                        hpSeenDifferentToAppointment: any
                      ) => (
                        <li {...props}>{hpSeenDifferentToAppointment.name}</li>
                      )}
                      onChange={(event: any, value: any) => {
                        setHpSeen(value?.name);
                        appointmentStatusPopupForm.setFieldValue(
                          "hpSeenDifferentToAppointment",
                          value
                        );
                      }}
                    />
                  </Mui.Grid>
                  {hpSeen === "Yes" && (
                    <Mui.Grid item container paddingTop={2}>
                      <Mui.Grid item xs={4}>
                        <Mui.Typography>
                          {t("hpSeenIfDifferentToAppointment")}
                          <Mui.Typography sx={{ color: "warning.dark" }}>
                            *
                          </Mui.Typography>
                        </Mui.Typography>
                      </Mui.Grid>
                      <Mui.Grid item xs={3.7}>
                        <Common.CellmaAutoSelectField
                          required
                          label={t("hpSeenIfDifferentToAppointment")}
                          ariaLabel="hpSeenIfDifferentToAppointment"
                          name="healthProfessional"
                          options={dummyData.HEALTH_PROFESSIONAL}
                          value={
                            appointmentStatusPopupForm.values
                              .healthProfessional ?? ""
                          }
                          onChange={(event: any, value: any) => {
                            appointmentStatusPopupForm.setFieldValue(
                              "healthProfessional",
                              value
                            );
                          }}
                          getOptionLabel={(healthProfessional: any) =>
                            healthProfessional.name ?? ""
                          }
                          renderOption={(
                            props: any,
                            healthProfessional: any
                          ) => <li {...props}>{healthProfessional.name}</li>}
                          onBlur={appointmentStatusPopupForm.handleBlur}
                          error={isError(
                            appointmentStatusPopupForm,
                            "healthProfessional"
                          )}
                        />
                      </Mui.Grid>
                    </Mui.Grid>
                  )}
                </Mui.Grid>
              )}

              {selectedStatusButton === "Cancel" && (
                <Mui.Grid item container>
                  <Mui.Grid item xs={4}>
                    <Mui.Typography>
                      {t("appointmentCancellation")}
                      <Mui.Typography sx={{ color: "warning.dark" }}>
                        *
                      </Mui.Typography>
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={3.7}>
                    <Common.CellmaAutoSelectField
                      required
                      label={t("appointmentCancellation")}
                      name="cancellation"
                      ariaLabel="appointmentCancellation"
                      options={dummyData.REASON_FOR_APPOINTMENT_CANCELLATION}
                      value={
                        appointmentStatusPopupForm.values.cancellation ?? ""
                      }
                      onChange={(event: any, value: any) => {
                        appointmentStatusPopupForm.setFieldValue(
                          "cancellation",
                          value
                        );
                      }}
                      getOptionLabel={(cancellation: any) =>
                        cancellation.label ?? ""
                      }
                      renderOption={(props: any, cancellation: any) => (
                        <li {...props}>{cancellation.label}</li>
                      )}
                      onBlur={appointmentStatusPopupForm.handleBlur}
                      error={isError(
                        appointmentStatusPopupForm,
                        "cancellation"
                      )}
                    />
                  </Mui.Grid>
                </Mui.Grid>
              )}
              {selectedStatusButton === "Delete" && (
                <Mui.Grid item container>
                  <Mui.Grid item xs={4}>
                    <Mui.Typography>
                      {t("appointmentDeletion")}
                      <Mui.Typography sx={{ color: "warning.dark" }}>
                        *
                      </Mui.Typography>
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={3.7}>
                    <Common.CellmaAutoSelectField
                      required
                      label={t("appointmentDeletion")}
                      name="deletion"
                      options={dummyData.REASON_FOR_APPOINTMENT_DELETION}
                      value={appointmentStatusPopupForm.values.deletion ?? ""}
                      onChange={(event: any, value: any) => {
                        appointmentStatusPopupForm.setFieldValue(
                          "deletion",
                          value
                        );
                      }}
                      getOptionLabel={(deletion: any) => deletion.label ?? ""}
                      renderOption={(props: any, deletion: any) => (
                        <li {...props}>{deletion.label}</li>
                      )}
                      onBlur={appointmentStatusPopupForm.handleBlur}
                      error={isError(appointmentStatusPopupForm, "deletion")}
                    />
                  </Mui.Grid>
                </Mui.Grid>
              )}
              {selectedStatusButton === "Rescheduled" && (
                <Mui.Grid item container>
                  <Mui.Grid item xs={4}>
                    <Mui.Typography>
                      {t("reschedulingAppointment")}
                      <Mui.Typography sx={{ color: "warning.dark" }}>
                        *
                      </Mui.Typography>
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={3.7}>
                    <Common.CellmaAutoSelectField
                      required
                      label={t("reschedulingAppointment")}
                      name="rescheduled"
                      options={dummyData.REASON_FOR_RESCHEDULED}
                      value={
                        appointmentStatusPopupForm.values.rescheduled ?? ""
                      }
                      onChange={(event: any, value: any) => {
                        appointmentStatusPopupForm.setFieldValue(
                          "rescheduled",
                          value
                        );
                      }}
                      getOptionLabel={(rescheduled: any) =>
                        rescheduled.label ?? ""
                      }
                      renderOption={(props: any, rescheduled: any) => (
                        <li {...props}>{rescheduled.label}</li>
                      )}
                      onBlur={appointmentStatusPopupForm.handleBlur}
                      error={isError(appointmentStatusPopupForm, "rescheduled")}
                    />
                  </Mui.Grid>
                </Mui.Grid>
              )}
              <Mui.Grid item container>
                <Mui.Grid item xs={4}>
                  <Mui.Typography>{t("appointmentReason")}</Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Common.CellmaInputField
                    label={t("appointmentReason")}
                    disabled
                    name="appointmentReason"
                    value={appointmentStatusPopupForm.values.appointmentReason}
                    onHandleChange={appointmentStatusPopupForm?.handleChange}
                  />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item container>
                <Mui.Grid item xs={4}>
                  <Mui.Typography>{t("appointmentNotes")}</Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Common.CellmaInputField
                    label={t("notes")}
                    multiline
                    minRows="4"
                    name="notes"
                    value={appointmentStatusPopupForm.values.notes}
                    onHandleChange={appointmentStatusPopupForm?.handleChange}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Common.CellmaButton label={t("save")} type="submit" />
            </Mui.Grid>
          </Mui.Grid>
        </form>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default AppointmentStatusPopup;

const styles = {
  popupHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  textGrid: {
    color: "primary.dark",
    display: "flex",
    justifyContent: "center",
  },
  statusButton: {
    display: "flex",
    justifyContent: "center",
  },
};
